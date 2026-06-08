import { prisma } from "../../../libs/prisma";
import { updateInboxStatus } from "../../actions/admin";

export default async function AdminInboxPage() {
  const messages = await prisma.inbox.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl text-[var(--near-black)]">Inbox</h1>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-white p-6 rounded border ${msg.status === 'new' ? 'border-[var(--aged-gold)] border-l-4' : 'border-[var(--warm-gray)]'} flex flex-col gap-4`}>
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="flex flex-col gap-1">
                <a href={`mailto:${msg.email}`} className="font-sans text-[15px] font-medium text-[var(--near-black)] hover:underline">
                  {msg.email}
                </a>
                <span className="font-sans text-[12px] text-gray-500">
                  Category: {msg.category} • {msg.createdAt.toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                {msg.status === 'new' && (
                  <form action={async () => {
                    "use server";
                    await updateInboxStatus(msg.id, 'read');
                  }}>
                    <button type="submit" className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">Mark Read</button>
                  </form>
                )}
                {msg.status !== 'archived' && (
                  <form action={async () => {
                    "use server";
                    await updateInboxStatus(msg.id, 'archived');
                  }}>
                    <button type="submit" className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded hover:bg-gray-200">Archive</button>
                  </form>
                )}
              </div>
            </div>
            
            <p className="font-sans text-[14px] text-gray-700 whitespace-pre-wrap">
              {msg.message}
            </p>
            
            <div className="pt-2">
              <a href={`mailto:${msg.email}?subject=Re: Inquiry to JEDIYWORKS`} className="inline-flex text-[13px] bg-[var(--crimson)] text-[var(--bone)] px-4 py-2 rounded">
                Reply via Email ↗
              </a>
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div className="bg-white p-12 text-center border border-[var(--warm-gray)] rounded">
            <p className="text-gray-500 italic">No messages in inbox.</p>
          </div>
        )}
      </div>
    </div>
  );
}
