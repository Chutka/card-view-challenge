import { Breadcrumbs, Button, Link } from "@material-ui/core";
import { Location } from 'history';
import { curryRight, isNil } from "lodash";
import { compose } from 'lodash/fp';
import React, { ComponentType, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  generatePath,
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { routeConfig } from "../routes/config";
import { historyLocationsSelector } from "../selectors/historySelector";

export type TBreadCrumb = {
  title: string;
  path: string;
  onClick(): void;
};

const createBreadCrumbs = (
  pathname: string,
  params: Readonly<Params<string>>
): TBreadCrumb[] => {
  const sortedRoutes = [...routeConfig].sort(
    (routeA, routeB) => routeA.path.length - routeB.path.length
  );
  const result: TBreadCrumb[] = [];
  for (let routeIndex = 0; routeIndex < sortedRoutes.length; routeIndex++) {
    const route = sortedRoutes[routeIndex];
    try {
      const preparedPath = generatePath(route.path, params);
      if (pathname.indexOf(preparedPath) !== 0 || isNil(route.name)) {
        continue;
      }

      result.push({
        title: route.name as string,
        path: preparedPath,
        onClick: () => {},
      });
    } catch {}
  }
  return result;
};

const configureOnClickForBreadCrubmbs = curryRight((
  breadCrubms: TBreadCrumb[],
  locations: Location[],
  navigate: NavigateFunction
): TBreadCrumb[] => {
  const result = [...breadCrubms];
  for (let resIndex = 0; resIndex < result.length; resIndex++) {
    const disabled = result.length - 1 === resIndex;
    if (disabled) {
      continue;
    }
    const prevLocationIndex = locations.length - result.length + resIndex;
    if (prevLocationIndex >= 0 && prevLocationIndex < locations.length) {
      const prevLocation = locations[prevLocationIndex];
      if (prevLocation.pathname === result[resIndex].path) {
        result[resIndex].onClick = () => {
          navigate(-result.length + resIndex + 1);
        };
        continue;
      }
    }

    result[resIndex].onClick = () => {
      navigate(result[resIndex].path, { replace: true });
    };
  }

  return result;
});

export function withBreadCrumbs<T extends object>(Component: ComponentType<T>) {
  function Wrapper(props: T) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const locations = useSelector(historyLocationsSelector);

    const breadCrumbs = useMemo<TBreadCrumb[]>(() => {
        return compose(
            configureOnClickForBreadCrubmbs(locations, navigate),
            createBreadCrumbs
        )(location.pathname, params);
    }, [location.pathname, locations, navigate, params]);

    return (
      <>
        <Breadcrumbs>
          {breadCrumbs.map((breadCrumb) => (
            <Link
              key={breadCrumb.title}
              component={Button}
              onClick={breadCrumb.onClick}
            >
              {breadCrumb.title}
            </Link>
          ))}
        </Breadcrumbs>
        <Component {...props} />
      </>
    );
  }

  Wrapper.displayName = `withBreadCrumbs(${
    Component.displayName ?? Component.name
  })`;

  return Wrapper;
}
