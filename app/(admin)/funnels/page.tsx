import { getFunnelsWithLeadCount } from "@/app/server/actions/funnels";

import { FunnelList } from "./funnel-list";

export default async function CounterListPage() {
  const funnels = await getFunnelsWithLeadCount();
  
  return (
    <div>
      <FunnelList funnels={funnels} />
    </div>
  );
};


