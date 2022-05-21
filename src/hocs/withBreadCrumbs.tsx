import { Breadcrumbs, Link,  } from '@material-ui/core';
import { isNil } from 'lodash';
import React, { ComponentType, useMemo } from 'react';
import { generatePath, Link as RouterLink, LinkProps as RouterLinkProps, useLocation, useParams } from 'react-router-dom';
import { routeConfig } from '../routes/config';

export type TBreadCrumb = Pick<RouterLinkProps, 'to' | 'children'>;

export function withBreadCrumbs<T extends object>(Component: ComponentType<T>) {
    function Wrapper (props: T) {
        const params = useParams();
        const location = useLocation();
        const breadCrumbs = useMemo<TBreadCrumb[]>(() => {
            const result: TBreadCrumb[] = [];
            for (const route of routeConfig) {
                try {
                    const preparedPath = generatePath(route.path, params);
                    if (location.pathname.indexOf(preparedPath) !== 0 || isNil(route.name)) {
                        continue;
                    }
                    result.push({
                        to: preparedPath,
                        children: route.name
                    })
                } catch {}
            }

            return result;
        }, [location.pathname, params])

        return (
            <> 
                <Breadcrumbs>
                    {breadCrumbs.map(breadcrumb => (
                        <Link
                            key={breadcrumb.to.toString()}
                            component={RouterLink}
                            {...breadcrumb}
                        />
                    ))}
                </Breadcrumbs>
                <Component {...props} />
            </>
        )
    };

    Wrapper.displayName = `withBreadCrumbs(${Component.displayName ?? Component.name})`;

    return Wrapper;
}