// // pages/campaign/[id].tsx
// import { useRouter } from 'next/navigation';

// const CampaignViewPage = () => {
//   const router = useRouter();
//   const { id } = router.;

//   return (
//     <div>
//       <h1>Campaign #{id}</h1>
//       <p>Here are the details of your campaign or counter.</p>
//       {/* Exiba detalhes do contador, como visualizações ou performance */}
//     </div>
//   );
// };

// export default CampaignViewPage;

export default async function CampaignViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      <h1>Campaign #{id}</h1>
      <p>Here are the details of your campaign or counter.</p>
    </div>
  );
}
