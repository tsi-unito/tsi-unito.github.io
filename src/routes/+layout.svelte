<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';

  let {children} = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon}/>
</svelte:head>


<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
  <header class="bg-background sticky top-0 h-12 flex items-center gap-4 border-b px-4 md:px-6 z-50">
    <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 h-full">
      <!--  class="{sectionName === s.path ? 'text-foreground' : 'text-muted-foreground'}  -->
      <a href="/" class="text-muted-foreground hover:text-foreground transition-colors flex items-center">Links</a>
      <a href="/minecraft" class="text-muted-foreground hover:text-foreground transition-colors flex items-center">Minecraft</a>
      <a href="/about" class="text-muted-foreground hover:text-foreground transition-colors flex items-center">Chi Siamo</a>
    </nav>

    <div class="flex justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 text-muted-foreground">
      <button class="hover:cursor-pointer hover:text-foreground transition-colors flex items-center">
        <span>Impostazioni</span>
      </button>
    </div>
  </header>

  {@render children()}
</div>

<!--
<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-4">
  <div class="fixed max-w-full z-10 h-16 flex items-center">
    <img src="/img/dipartimento.jpg"
         alt="Foto del dipartimento dall'esterno"
         class=" rounded-lg mb-2 w-full h-full absolute top-0 left-0"
    />

    <NavigationMenu.Root class="z-10">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Item One</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link>Link</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>

  <div class="pt-16">
    {@render children()}
  </div>
</div>
-->
