<script lang="ts">
  import type {PageProps} from "./$types";
  import Fuse, {type IFuseOptions} from "fuse.js";

  import {renderMarkdownInline} from './markdown'
  import type {SvgIcon} from "$lib/utils/types";
  import {type GroupInfo, groupsArraySchema} from "$lib/schema"

  import * as InputGroup from "$lib/components/ui/input-group";
  import * as Empty from "$lib/components/ui/empty";
  import {Button} from "$lib/components/ui/button";

  import LucideX from '~icons/lucide/x'
  import LucideExternalLink from '~icons/lucide/external-link'
  import Search from '~icons/lucide/search'
  import LucideCircleQuestionMark from '~icons/lucide/circle-question-mark'
  import LogosTelegram from '~icons/logos/telegram'
  import TwemojiThinkingFace from '~icons/twemoji/thinking-face'
  import TwemojiSadButRelievedFace from '~icons/twemoji/sad-but-relieved-face'

  // todo maybe move to an async fetch just to make the page load completely immediately and then let the user understand that the issue is their connection.
  // we could also use a localstorage to cache a version and just check for changes.
  let {data}: PageProps = $props();
  const receivedJson = data.linksJson;

  const inferLogo = (group: GroupInfo): SvgIcon | null => {
    const url = group.url.toLowerCase();
    // todo replace with a web domain extraction method and a switch-case
    if (url.includes("://t.me/"))
      return LogosTelegram
    return null;
  };

  // the `options` field is for future expansion of this method
  const getMainTitle = (group: GroupInfo): string => {
    const preferredLanguage = 'it'

    switch (typeof group.title) {
      case "object":
        if (Array.isArray(group.title)) {
          return group.title[0];
        } else {
          return group.title[preferredLanguage]
        }
      case "string":
        return group.title;
      default:
        return `undefined title (${JSON.stringify(group)})`;
    }
  }

  const groupsList: GroupInfo[] = groupsArraySchema.parse(JSON.parse(receivedJson));

  const fuseOptions: IFuseOptions<GroupInfo> = {
    keys: ['title', 'title.it', "title.en"],
    shouldSort: true,
    // minMatchCharLength: 2
  }
  const fuse = new Fuse(groupsList, fuseOptions);
  let searchQuery = $state('');
  let filteredGroups = $derived.by(() => {
    return fuse.search(searchQuery)
  });

  const clearInput = () => {
    searchQuery = '';
  }
</script>

{#snippet GroupSnippet(group: GroupInfo)}
  <li>
    <a href={group.url} class="flex items-center max-w-fit">
      <div class="flex">
        <span>{@html renderMarkdownInline(getMainTitle(group))}</span>
        <LucideExternalLink class="size-3 ms-0.5"></LucideExternalLink>
      </div>
      <svelte:component this={inferLogo(group)} class="size-4 ms-1"></svelte:component>
    </a>
  </li>
{/snippet}

<div class="relative mx-auto w-full max-w-md my-2">
  <InputGroup.Root>
    <InputGroup.Input type="text" placeholder="Ricerca rapida" bind:value={searchQuery}/>
    <InputGroup.Addon>
      <Search/>
    </InputGroup.Addon>
    {#if searchQuery}
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button onclick={clearInput}>
          <LucideX/>
        </InputGroup.Button>
      </InputGroup.Addon>
    {/if}
    <InputGroup.Addon align="inline-end">
      <InputGroup.Button>
        <LucideCircleQuestionMark/>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
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