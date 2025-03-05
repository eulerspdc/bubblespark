'use client';

import { EmptyState } from "./empty-state-page";

export default function CenteredEmptyState() {
  return (
    <div className="container mx-auto p-4 h-screen flex justify-center items-center">
      
      
      <EmptyState
        title="No items found"
        message="It looks like there are no items in this list yet. Why not add some?"
        actionLabel="Add Item"
        // onAction={() => console.log("Add item clicked")}
      />
      
    </div>
  )
}

