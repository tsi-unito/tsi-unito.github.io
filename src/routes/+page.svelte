<script lang="ts">
  import type {Component} from "svelte";
  import type {SvelteHTMLElements} from "svelte/elements";
  import * as z from 'zod';
  import Fuse, {type IFuseOptions} from "fuse.js";

  import {renderMarkdownInline} from './markdown'

  import {Input} from "$lib/components/ui/input/index.js";
  import * as Empty from "$lib/components/ui/empty/index.js";
  import {Button} from "$lib/components/ui/button";

  import LucideX from '~icons/lucide/x'
  import LucideExternalLink from '~icons/lucide/external-link'
  import LogosTelegram from '~icons/logos/telegram'
  import TwemojiThinkingFace from '~icons/twemoji/thinking-face'
  import TwemojiSadButRelievedFace from '~icons/twemoji/sad-but-relieved-face'

  type SvgIcon = Component<SvelteHTMLElements['svg']>;

  const groupTitleSchema = z.union([
    z.string(),
    z.object({
      it: z.string(),
      en: z.string(),
    }),
    z.array(z.string()),
  ]);

  const yearsOfStudySchema = z.enum(["first", "second", "third", "fourth", "fifth"]);

  const groupSchema = z.object({
    title: groupTitleSchema,
    url: z.url(),
    abbreviations: z.array(z.string()).optional(), // Optional list of strings
    yearOfStudy: z.array(yearsOfStudySchema).optional(), // Enum for year of study
  });

  const groupsArraySchema = z.array(groupSchema);

  type GroupInfo = z.infer<typeof groupSchema>;

  const receivedJson = `[
  {
    "title": "Gruppo **Generale**",
    "url": "https://t.me/joinchat/Ci07EELN-R3W2xI6-SGfGg"
  },
  {
    "title": "Gruppo **Laurea Magistrale**",
    "url": "https://t.me/joinchat/BbqyERQcACYhQFEO1iJD2g"
  },
  {
    "title": "Gruppo di **Discussione Off Topic**",
    "url": "https://t.me/+_zMDhpzM3q1iNjE0"
  },
  {
    "title": "Gruppo **Studenti Lavoratori**",
    "url": "https://t.me/joinchat/QC1UEhvITLJNL33noRtszQ"
  },
  {
    "title": {
      "it": "Gruppo **Studenti Internazionali**",
      "en": "Group for **International Students**"
    },
    "url": "https://t.me/international_students_CS_unito"
  },
  {
    "title": "Gruppo **Erasmus Outgoing**",
    "url": "https://t.me/+QmBavGF8TKZkM2Fk"
  },
  {
    "title": "Gruppo **Collaborazioni a Tempo Parziale**",
    "url": "https://t.me/+OkYePvUNXNVjODc0"
  },
  {
    "title": ["Gruppo **Primo Anno**", "Gruppo **Matricole**"],
    "url": "https://t.me/+Ox2fUmU2Un4xYTM0"
  }
]`;

  const inferLogo = (group: GroupInfo): SvgIcon | null => {
    const url = group.url.toLowerCase();
    // todo replace with a web domain extraction method and a switch-case
    if (url.includes("://t.me/"))
      return LogosTelegram
    return null;
  };

  const groupsList: GroupInfo[] = groupsArraySchema.parse(JSON.parse(receivedJson));

  const fuseOptions: IFuseOptions<GroupInfo> = {
    keys: ['title', 'title.it', "title.en"],
    shouldSort: true,
    // minMatchCharLength: 2
  }
  const fuse = new Fuse(groupsList, fuseOptions);
  let searchQuery = $state('generdxasdasdasdasd');
  let filteredGroups = $derived.by(() => {
    return fuse.search(searchQuery)
  });

  const clearInput = () => {
    searchQuery = '';
  }

</script>

{#snippet GroupSnippet(group: GroupInfo)}
  {#if typeof group.title === 'string'}
    <li>
      <a href={group.url} class="flex items-center max-w-fit">
        <div class="flex">
          <span>{@html renderMarkdownInline(group.title)}</span>
          <LucideExternalLink class="size-3 ms-0.5"></LucideExternalLink>
        </div>
        <svelte:component this={inferLogo(group)} class="size-4 ms-1"></svelte:component>
      </a>
    </li>
  {:else}
    <li>{group.title}</li> <!-- todo -->
  {/if}
{/snippet}

<div class="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-4">
  <img src="/img/dipartimento.jpg"
       class="w-full sm:max-w-screen-lg h-screen sm:h-auto object-cover rounded-lg mb-2"
       alt="Foto del dipartimento dall'esterno"
  />
  <div class="relative mx-auto w-full max-w-md">
    <Input type="text" placeholder="Ricerca rapida" bind:value={searchQuery} class="my-2"/>
    {#if searchQuery}
      <button type="button"
              class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none hover:cursor-pointer"
              onclick={clearInput}>
        <LucideX/>
      </button>
    {/if}
  </div>

  {#if searchQuery}
    {#if filteredGroups.length > 0}
      <ul class="flex flex-col gap-y-1.5">
        {#each filteredGroups as fg}
          {@render GroupSnippet(fg.item)}
        {/each}
      </ul>
    {:else}
      <Empty.Root>
        <Empty.Header>
          <Empty.Media variant="default">
<!--            <TwemojiThinkingFace class="size-12"/>-->
            <TwemojiSadButRelievedFace class="size-12"/>
          </Empty.Media>
          <Empty.Title>Nessun risultato</Empty.Title>
          <Empty.Description>
            <p>La ricerca con le parole chiave che hai inserito non corrisponde ad alcun gruppo.</p>
            <p>Controlla di aver digitato correttamente tutto; prova altrimenti a resettare la ricerca.</p>
          </Empty.Description>
        </Empty.Header>
        <Empty.Content>
          <Button variant="outline" onclick={clearInput} class="hover:cursor-pointer">Reset</Button>
        </Empty.Content>
      </Empty.Root>
    {/if}
  {:else}
    <ul class="flex flex-col gap-y-1.5">
      {#each groupsList as group}
        {@render GroupSnippet(group)}
      {/each}
    </ul>
  {/if}
</div>