export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import { SiteNavigationElement } from "apps/commerce/types.ts";
import { type MultivariateFlag } from "@deco/deco/blocks";
/**
 * @title NavItems Variate
 */
export default function NavItemsVariate(
  props: MultivariateProps<SiteNavigationElement[] | null>,
): MultivariateFlag<SiteNavigationElement[] | null> {
  return multivariate(props);
}
