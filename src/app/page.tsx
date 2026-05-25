"use client";

import { useState } from "react";

import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  auth,
  provider,
} from "@/lib/firebase";

const allRizz = [
  {
    id: 1,
    text: "J’vais pas mentir… ton regard m’a déconcentré.",
    category: "Smooth",
  },
  {
    id: 2,
    text: "T’as un truc dangereux dans ton énergie.",
    category: "Street",
  },
  {
    id: 3,
    text: "J’te connais même pas encore mais j’aime déjà ton vibe.",
    category: "Flirty",
  },
  {
    id: 4,
    text: "On dirait que t’es sortie d’un film.",
    category: "Romantique",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] =
    useState("Tous");

  const [favorites, setFavorites] = useState<number[]>([]);

  const [toast, setToast] = useState("");

  const [message, setMessage] = useState("");

  const [aiReply, setAiReply] = useState("");

  const [user, setUser] = useState<any>(null);

  const categories = [
    "Tous",
    "Smooth",
    "Street",
    "Flirty",
    "Romantique",
  ];

  const filteredRizz =
    selectedCategory === "Tous"
      ? allRizz
      : allRizz.filter(
          (item) => item.category === selectedCategory
        );

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);

    setToast("Texte copié ✅");

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(
        favorites.filter((fav) => fav !== id)
      );
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const generateReply = () => {
    if (!message) return;

    const replies = [
      "Franchement… j’aurais répondu plus vite si t’étais devant moi 😏",
      "Toi t’as clairement un effet dangereux.",
      "J’essaie de rester calme mais ton message aide pas.",
      "Tu parles toujours comme ça ou j’ai de la chance ?",
      "J’vais pas mentir… ton vibe est incroyable.",
    ];

    const randomReply =
      replies[
        Math.floor(Math.random() * replies.length)
      ];

    setAiReply(randomReply);
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        provider
      );

      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);

    setUser(null);
  };

  return (
    <main className="min-h-screen bg-black text-white pb-28 overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full" />

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-violet-500/20 blur-3xl rounded-full" />

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-pink-500 px-5 py-3 rounded-2xl z-50 font-semibold">
          {toast}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-white/10 sticky top-0 backdrop-blur-xl bg-black/60 z-40">
        <h1 className="text-3xl font-black">
          Rizzicco
        </h1>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              alt=""
              className="w-10 h-10 rounded-full"
            />

            <button
              onClick={logout}
              className="bg-white/10 px-4 py-2 rounded-2xl"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="bg-pink-500 hover:bg-pink-600 transition px-5 py-2 rounded-2xl font-semibold"
          >
            Connexion Google
          </button>
        )}
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-16">
        <h2 className="text-5xl md:text-7xl font-black leading-tight">
  Rizz Plus
  <br />
</h2>

        <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg">
          Les meilleures phrases pour parler avec style.
        </p>
      </section>

      {/* AI */}
      <section className="px-6 pb-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h3 className="text-3xl font-black mb-4">
            Générateur IA
          </h3>

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Écris un message..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none min-h-[120px]"
          />

          <button
            onClick={generateReply}
            className="mt-4 w-full bg-pink-500 hover:bg-pink-600 transition py-4 rounded-2xl font-bold"
          >
            Générer
          </button>

          {aiReply && (
            <div className="mt-6 bg-black/40 border border-pink-500/30 rounded-2xl p-5">
              <p className="text-xl font-medium">
                {aiReply}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="flex gap-3 overflow-x-auto px-6 pb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
              selectedCategory === category
                ? "bg-pink-500"
                : "bg-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      {/* CARDS */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {filteredRizz.map((line) => (
          <div
            key={line.id}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div className="inline-block bg-pink-500/20 text-pink-400 text-sm px-3 py-1 rounded-full mb-4">
                {line.category}
              </div>

              <button
                onClick={() =>
                  toggleFavorite(line.id)
                }
                className="text-2xl"
              >
                {favorites.includes(line.id)
                  ? "❤️"
                  : "🤍"}
              </button>
            </div>

            <p className="text-2xl font-medium leading-relaxed min-h-[120px]">
              “{line.text}”
            </p>

            <button
              onClick={() =>
                copyText(line.text)
              }
              className="mt-6 w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-2xl font-semibold"
            >
              Copier
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}