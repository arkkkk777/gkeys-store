import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Frame } from '@/components/ui/frame';
import { Group } from '@/components/ui/group';
import { Link } from '@/components/ui/link';
import { Overlay } from '@/components/ui/overlay';
import { EmptyState, EmptyCart, EmptyWishlist } from '@/components/ui/empty-state';
import { Feedback } from '@/components/ui/feedback';
import { ShoppingCart, Search } from 'lucide-react';

/**
 * Component Showcase Page
 * 
 * Visual testing page for all UI kit components.
 * Access at /component-showcase route.
 */
export default function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showFeedback, setShowFeedback] = useState(true);

  return (
    <div className="min-h-screen bg-design-background text-design-text p-design-lg">
      <Container padding="lg" spacing="xl">
        <h1 className="text-3xl font-bold mb-design-xl">UI Kit Component Showcase</h1>

        {/* Buttons */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Buttons</h2>
          <Group spacing="md" direction="row" className="flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="primary" icon={<ShoppingCart />}>With Icon</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" fullWidth>Full Width</Button>
          </Group>
        </Section>

        {/* Form Components */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Form Components</h2>
          <Group spacing="lg" direction="column" className="max-w-md">
            <div>
              <Label htmlFor="input-demo" required>Input</Label>
              <Input
                id="input-demo"
                type="text"
                placeholder="Enter text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="input-error">Input with Error</Label>
              <Input
                id="input-error"
                type="email"
                error="Invalid email address"
                value="invalid@"
              />
            </div>
            <div>
              <Label htmlFor="textarea-demo">Textarea</Label>
              <Textarea
                id="textarea-demo"
                placeholder="Enter message"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="select-demo">Select</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger id="select-demo">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
                label="Enable notifications"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={checkboxChecked}
                onCheckedChange={(checked) => setCheckboxChecked(checked === true)}
              />
              <Label htmlFor="checkbox-demo">I agree to the terms</Label>
            </div>
          </Group>
        </Section>

        {/* Container Components */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Container Components</h2>
          <Group spacing="md" direction="row" className="flex-wrap">
            <Container padding="sm" background="surfaceLight">
              <p>Small padding, surface light</p>
            </Container>
            <Container padding="md" background="surface">
              <p>Medium padding, surface</p>
            </Container>
            <Container padding="lg" background="default">
              <p>Large padding, default</p>
            </Container>
          </Group>
        </Section>

        {/* Links */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Links</h2>
          <Group spacing="md" direction="row" className="flex-wrap">
            <Link href="/" variant="default">Default Link</Link>
            <Link href="/" variant="primary">Primary Link</Link>
            <Link href="/" variant="muted">Muted Link</Link>
            <Link href="/" variant="primary" icon={<ShoppingCart />}>Link with Icon</Link>
          </Group>
        </Section>

        {/* Empty States */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Empty States</h2>
          <Group spacing="lg" direction="row" className="flex-wrap">
            <Frame padding="lg" background="surfaceLight" className="w-full max-w-md">
              <EmptyCart />
            </Frame>
            <Frame padding="lg" background="surfaceLight" className="w-full max-w-md">
              <EmptyWishlist />
            </Frame>
            <Frame padding="lg" background="surfaceLight" className="w-full max-w-md">
              <EmptyState
                icon={<Search className="h-12 w-12" />}
                title="No results found"
                message="Try adjusting your search filters"
                action={<Button variant="primary">Clear Filters</Button>}
              />
            </Frame>
          </Group>
        </Section>

        {/* Feedback */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Feedback Messages</h2>
          <Group spacing="md" direction="column" className="max-w-md">
            {showFeedback && (
              <Feedback
                type="success"
                message="Operation completed successfully!"
                dismissible
                onDismiss={() => setShowFeedback(false)}
              />
            )}
            <Feedback type="error" message="An error occurred. Please try again." />
            <Feedback type="warning" message="Your session will expire soon." />
            <Feedback type="info" message="New features are available." />
          </Group>
        </Section>

        {/* Overlay */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Overlay</h2>
          <Button variant="primary" onClick={() => setShowOverlay(true)}>
            Open Overlay
          </Button>
          <Overlay visible={showOverlay} onClose={() => setShowOverlay(false)} blur>
            <Frame padding="lg" background="surface" className="max-w-md">
              <h3 className="text-xl font-semibold mb-design-md">Modal Title</h3>
              <p className="mb-design-md">This is a modal overlay with blur effect.</p>
              <Group spacing="sm" direction="row" className="justify-end">
                <Button variant="secondary" onClick={() => setShowOverlay(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowOverlay(false)}>
                  Confirm
                </Button>
              </Group>
            </Frame>
          </Overlay>
        </Section>

        {/* Component Combinations */}
        <Section padding="md" background="surface" className="mb-design-lg">
          <h2 className="text-2xl font-semibold mb-design-md">Component Combinations</h2>
          <Frame padding="lg" background="surfaceLight">
            <h3 className="text-lg font-semibold mb-design-md">Form Example</h3>
            <Group spacing="md" direction="column">
              <div>
                <Label htmlFor="name" required>Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email" required>Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <Group spacing="sm" direction="row" className="justify-end">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Submit</Button>
              </Group>
            </Group>
          </Frame>
        </Section>
      </Container>
    </div>
  );
}
