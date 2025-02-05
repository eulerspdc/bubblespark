'use client';

// pages/[...slug].tsx
import { usePathname } from 'next/navigation';  // Importando o hook usePathname
import { DynamicBreadcrumb } from './dynamic-breadcrumb';
// import Breadcrumb from '../components/Breadcrumb';

const DynamicPage = () => {
  const pathname = usePathname();  // Pegando a URL atual com usePathname
  const slug = pathname?.split('/').filter((segment) => segment !== ''); // Pegando os segmentos da URL

  // Gerando os breadcrumbs com base na URL
  const paths = slug
    ? [
        { name: 'Home', href: '/' },
        ...slug.map((segment: string, index: number) => ({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          href: '/' + slug.slice(0, index + 1).join('/'),
        })),
      ]
    : [{ name: 'Home', href: '/' }];

  return (
    <div>
      <DynamicBreadcrumb paths={paths} />
      {/* <h1>{slug ? slug.join(' / ') : 'Página Inicial'}</h1> */}
    </div>
  );
};

export default DynamicPage;
