import { vaisselleJetableFilterGroups as scrapedFilterGroups } from "@/lib/vaisselle-jetable-data";

export type CategoryFilterOption = {
  id: string;
  label: string;
  count?: number;
  /** Clé d’attribut Magento pour filtrage client (maquette). */
  filterKey?: string;
};

export type CategoryFilterGroup = {
  id: string;
  label: string;
  options: readonly CategoryFilterOption[];
};

export const vaisselleJetableFilterGroups: readonly CategoryFilterGroup[] = scrapedFilterGroups;

export const categoryFilterGroupIds = vaisselleJetableFilterGroups.map((group) => group.id);
