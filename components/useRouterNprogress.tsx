// credit:
// https://github.com/TheSGJ/nextjs-toploader/issues/10#issuecomment-2407932155

import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

export const useRouterWithLoader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pushWithLoader = (href: string, options: any) => {
    NProgress.start();

    return router.push(href, options);
  };

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return {
    ...router,
    push: pushWithLoader,
  };
};