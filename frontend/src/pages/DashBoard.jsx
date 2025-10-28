import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginLogoutButton from "../components/LoginLogoutButton";
import LoadingSkeleton from "../components/LoadingSkeleton.jsx";
import MailDrawer from "../components/MailDrawer.jsx";
import { fetchMails } from "../store/mailSlice.js";
import { fmtDate } from "../utils/miscellaneous.js";
function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { mails, mailLoading } = useSelector((state) => state.mail);
  const [selected, setSelected] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchMails(limit));
  }, [dispatch, limit]);
  console.log(mails);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">MailMind</h1>
        <LoginLogoutButton />
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col gap-6">
          <aside className="flex flex-col bg-white shadow rounded-lg p-5">
            <div className="flex items-center gap-4">
              <img src={user?.picture} alt="profile" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-lg">{user?.name}</div>
                <div className="text-sm text-slate-500">{user?.email}</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="limitSelect" className="text-sm text-slate-600">
                Emails to fetch
              </label>
              <select
                id="limitSelect"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
              >
                {[5, 10, 15, 20, 25].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Inbox</h2>
              <p className="text-sm text-slate-500">AI-assisted Gmail preview</p>
            </div>

            <div className="space-y-4">
              {mailLoading ? (
                <div className="space-y-4">
                  <LoadingSkeleton count={limit} />
                </div>
              ) : mails.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center text-slate-500">No mails found</div>
              ) : (
                mails.map((mail) => (
                  <article
                    key={mail.id}
                    className="bg-white shadow-sm hover:shadow-md rounded-lg p-4 transition cursor-pointer"
                    onClick={() => setSelected(mail)}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-lg font-medium truncate">{mail.subject}</h3>
                          <div className="text-sm text-slate-400">{fmtDate(mail.date)}</div>
                        </div>
                        <div className="text-sm text-slate-500 mt-1 truncate">
                          From: <span className="text-slate-700 font-medium">{mail.from}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-slate-700 line-clamp-2">{mail.content}</div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <MailDrawer open={!!selected} mail={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default Dashboard;