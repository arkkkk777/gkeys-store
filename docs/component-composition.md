# Component Composition Examples

Examples of combining UI kit components to create common patterns.

## Form Patterns

### Login Form

```tsx
<Container padding="lg" background="surface">
  <form onSubmit={handleLogin}>
    <div className="space-y-4">
      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
      </div>
      
      <div>
        <Label htmlFor="password" required>Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      </div>
      
      <Button type="submit" variant="primary" fullWidth>
        Sign In
      </Button>
    </div>
  </form>
</Container>
```

### Search Form

```tsx
<Group spacing="sm" direction="row">
  <Input
    type="search"
    placeholder="Search games..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    fullWidth
  />
  <Button variant="primary" icon={<Search />}>
    Search
  </Button>
</Group>
```

## Layout Patterns

### Page Header

```tsx
<Section padding="md" background="surface">
  <Container padding="sm" spacing="md">
    <Group spacing="md" direction="row" className="items-center justify-between">
      <h1>Page Title</h1>
      <Button variant="primary">Action</Button>
    </Group>
  </Container>
</Section>
```

### Card with Actions

```tsx
<Frame padding="lg" background="surface">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
  <Group spacing="sm" direction="row" className="mt-4">
    <Button variant="primary">Primary Action</Button>
    <Button variant="secondary">Secondary</Button>
  </Group>
</Frame>
```

## Feedback Patterns

### Success Message

```tsx
<Container padding="md">
  <Feedback
    type="success"
    message="Your order has been placed successfully!"
    dismissible
    onDismiss={() => setShowSuccess(false)}
  />
</Container>
```

### Error Handling

```tsx
<Container padding="md">
  {error && (
    <Feedback
      type="error"
      message={error}
      dismissible
      onDismiss={() => setError(null)}
    />
  )}
  <form>
    {/* Form content */}
  </form>
</Container>
```

## Empty State Patterns

### Empty Cart with Action

```tsx
<Container padding="xl" background="surface">
  <EmptyCart
    action={
      <Button variant="primary" href="/catalog">
        Browse Games
      </Button>
    }
  />
</Container>
```

### Empty Search Results

```tsx
<Container padding="xl">
  <EmptyState
    icon={<Search className="h-12 w-12" />}
    title="No games found"
    message="Try adjusting your search or filters"
    action={
      <Group spacing="sm" direction="row">
        <Button variant="primary" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button variant="secondary" href="/catalog">
          Browse All
        </Button>
      </Group>
    }
  />
</Container>
```

## Modal Patterns

### Confirmation Dialog

```tsx
<Overlay visible={showConfirm} onClose={() => setShowConfirm(false)} blur>
  <Frame padding="lg" background="surface" className="max-w-md">
    <h2>Confirm Action</h2>
    <p>Are you sure you want to proceed?</p>
    <Group spacing="sm" direction="row" className="mt-4 justify-end">
      <Button variant="secondary" onClick={() => setShowConfirm(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Group>
  </Frame>
</Overlay>
```

## Settings Patterns

### Toggle Setting

```tsx
<Group spacing="md" direction="row" className="items-center justify-between">
  <div>
    <Label>Enable Notifications</Label>
    <p className="text-sm text-design-text-muted">
      Receive email notifications about your orders
    </p>
  </div>
  <Switch
    checked={notificationsEnabled}
    onCheckedChange={setNotificationsEnabled}
  />
</Group>
```

### Select Setting

```tsx
<div>
  <Label htmlFor="language">Language</Label>
  <Select value={language} onValueChange={setLanguage}>
    <SelectTrigger id="language">
      <SelectValue placeholder="Select language" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="ru">Russian</SelectItem>
    </SelectContent>
  </Select>
</div>
```

## Navigation Patterns

### Breadcrumbs

```tsx
<Group spacing="sm" direction="row" className="items-center">
  <Link href="/">Home</Link>
  <span className="text-design-text-muted">/</span>
  <Link href="/catalog">Catalog</Link>
  <span className="text-design-text-muted">/</span>
  <span className="text-design-text">Current Page</span>
</Group>
```

### Action Bar

```tsx
<Section padding="md" background="surface">
  <Group spacing="md" direction="row" className="items-center justify-between">
    <h2>Items (5)</h2>
    <Group spacing="sm" direction="row">
      <Button variant="secondary">Clear</Button>
      <Button variant="primary">Checkout</Button>
    </Group>
  </Group>
</Section>
```
