import type {PageLoad} from "./$types";

export const load: PageLoad = async () => {
  const linksJson = `[
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

  return {linksJson}
}