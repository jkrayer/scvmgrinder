import sacredScrolls from "./scrolls_sacred";
import uncleanScrolls from "./scrolls_unclean";

const SCROLLS: { sacred: Scroll[]; unclean: Scroll[] } = {
  sacred: sacredScrolls,
  unclean: uncleanScrolls,
};

// type ScrollKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ScrollTypes = "unclean" | "sacred";

const getScroll = (scrollType: ScrollTypes) => (key: number) =>
  SCROLLS[scrollType][key];

export const getSacredScroll = getScroll("sacred");
export const getUncleanScroll = getScroll("unclean");
