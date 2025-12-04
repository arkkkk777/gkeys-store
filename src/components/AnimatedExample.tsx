import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnimatedExample() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle>Framer Motion Animation</CardTitle>
            <CardDescription>
              Пример использования Framer Motion с shadcn/ui компонентами
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button>Наведите на меня</Button>
          </motion.div>
          
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="p-4 bg-muted rounded-lg"
          >
            <p>Анимированный текст с пружинным эффектом</p>
          </motion.div>

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 bg-primary rounded-full mx-auto"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

