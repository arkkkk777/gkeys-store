import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const prisma = new PrismaClient().$extends(withAccelerate());

// Load JSON data from file or use inline data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'g2a-data.json');
let g2aData: any;

// Try to load from file first
if (fs.existsSync(dataPath)) {
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  g2aData = JSON.parse(fileContent);
  console.log(`📁 Loaded data from ${dataPath}`);
} else {
  // Fallback: use inline data (paste your JSON here)
  console.log('⚠️  g2a-data.json not found. Using inline data...');
  g2aData = {
    "total": 0,
    "page": 1,
    "docs": []
  };
}

interface G2AProduct {
  id: string;
  name: string;
  slug: string;
  qty: number;
  minPrice: number;
  thumbnail: string;
  smallImage: string;
  coverImage: string;
  images: string[];
  release_date: string;
  developer: string;
  publisher: string;
  platform: string;
  categories: Array<{ id: number; name: string }>;
  videos: Array<{ type: string; url: string }>;
}

async function importG2AData() {
  try {
    console.log('🚀 Starting G2A data import...\n');
    
    const products: G2AProduct[] = g2aData.docs || [];
    
    if (products.length === 0) {
      console.log('⚠️  No products to import. Please add data to g2a-data.json');
      console.log(`   Expected file: ${dataPath}`);
      return;
    }

    console.log(`📦 Found ${products.length} products to import\n`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      try {
        // Check if game already exists by g2aProductId
        const existing = await prisma.game.findFirst({
          where: { g2aProductId: product.id }
        });

        if (existing) {
          console.log(`⏭️  [${i + 1}/${products.length}] Skipping "${product.name.substring(0, 50)}..." (already exists)`);
          skipped++;
          continue;
        }

        // Extract slug from full slug path
        let slug = product.slug
          .replace(/^\//, '')
          .replace(/\/$/, '')
          .replace(/^\/+/, '')
          .toLowerCase();
        
        if (!slug || slug.length === 0) {
          slug = product.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }

        // Ensure slug is unique
        let finalSlug = slug;
        let counter = 1;
        while (await prisma.game.findUnique({ where: { slug: finalSlug } })) {
          finalSlug = `${slug}-${counter}`;
          counter++;
        }

        // Parse release date
        const releaseDate = product.release_date && product.release_date.trim()
          ? new Date(product.release_date) 
          : new Date(); // Default to now if no date

        // Prepare images array
        const images = product.images && product.images.length > 0 
          ? product.images 
          : product.coverImage 
            ? [product.coverImage] 
            : product.thumbnail 
              ? [product.thumbnail] 
              : [];

        const mainImage = product.coverImage || product.thumbnail || images[0] || '';

        // Get or create categories
        const categoryConnections = await Promise.all(
          product.categories.map(async (cat) => {
            let category = await prisma.category.findFirst({
              where: { name: cat.name }
            });

            if (!category) {
              const categorySlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              let uniqueSlug = categorySlug;
              let slugCounter = 1;
              
              while (await prisma.category.findUnique({ where: { slug: uniqueSlug } })) {
                uniqueSlug = `${categorySlug}-${slugCounter}`;
                slugCounter++;
              }

              category = await prisma.category.create({
                data: { 
                  name: cat.name, 
                  slug: uniqueSlug
                }
              });
            }

            return { id: category.id };
          })
        );

        // Get or create platform
        let platformConnections: Array<{ id: string }> = [];
        if (product.platform && product.platform.trim()) {
          let platform = await prisma.platform.findFirst({
            where: { name: product.platform }
          });

          if (!platform) {
            const platformSlug = product.platform.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let uniqueSlug = platformSlug;
            let slugCounter = 1;
            
            while (await prisma.platform.findUnique({ where: { slug: uniqueSlug } })) {
              uniqueSlug = `${platformSlug}-${slugCounter}`;
              slugCounter++;
            }

            platform = await prisma.platform.create({
              data: { 
                name: product.platform, 
                slug: uniqueSlug
              }
            });
          }
          platformConnections = [{ id: platform.id }];
        }

        // Create game
        const game = await prisma.game.create({
          data: {
            g2aProductId: product.id,
            title: product.name,
            slug: finalSlug,
            description: product.name, // Use name as description if no description
            shortDescription: null,
            price: product.minPrice,
            originalPrice: null,
            discount: 0,
            currency: 'EUR',
            image: mainImage,
            images: images,
            inStock: product.qty > 0,
            g2aStock: product.qty > 0,
            g2aLastSync: new Date(),
            releaseDate: releaseDate,
            publisher: product.publisher || null,
            categories: {
              create: categoryConnections.map(cat => ({
                category: { connect: { id: cat.id } }
              }))
            },
            ...(platformConnections.length > 0 && {
              platforms: {
                create: platformConnections.map(plat => ({
                  platform: { connect: { id: plat.id } }
                }))
              }
            })
          }
        });

        if ((i + 1) % 10 === 0 || i === products.length - 1) {
          console.log(`✅ [${i + 1}/${products.length}] Imported: "${product.name.substring(0, 60)}..."`);
        }
        imported++;

      } catch (error: any) {
        console.error(`❌ [${i + 1}/${products.length}] Error importing "${product.name.substring(0, 50)}...":`, error.message);
        if (error.code === 'P2002') {
          console.error(`   → Duplicate entry (slug or g2aProductId conflict)`);
        }
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log('='.repeat(60));
    console.log(`   ✅ Imported: ${imported}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📦 Total: ${products.length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('💥 Fatal error during import:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importG2AData();
