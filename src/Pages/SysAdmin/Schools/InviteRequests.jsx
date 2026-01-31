import { useState } from "react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";

const sampleConversations = [
  {
    id: 1,
    title: "Greenwood Academy - John Doe",
    messages: [
      { id: 1, from: "them", text: "Hello! Are my documents approved yet?" },
      { id: 2, from: "you", text: "Hi John, we're reviewing them now." },
    ],
  },
  {
    id: 2,
    title: "Hillcrest International - Mary Smith",
    messages: [{ id: 1, from: "them", text: "Need to update application details." }],
  },
];

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedMessages = [
      ...selectedConversation.messages,
      { id: Date.now(), from: "you", text: newMessage },
    ];
    setSelectedConversation({ ...selectedConversation, messages: updatedMessages });
    setNewMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 font-inter text-slate-700 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversations List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6 h-full overflow-auto">
        <h2 className="font-bold text-xl mb-4">Conversations</h2>
        <ul>
          {sampleConversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
              className={`cursor-pointer px-4 py-3 rounded-lg mb-2 ${
                selectedConversation?.id === conv.id ? "bg-indigo-100 text-indigo-700" : "hover:bg-indigo-50"
              }`}
            >
              <FaUserCircle className="inline-block mr-2 text-indigo-500" />
              {conv.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow flex flex-col h-[600px]">
        {selectedConversation ? (
          <>
            <div className="p-6 border-b border-slate-200 font-semibold text-lg">
              {selectedConversation.title}
            </div>
            <div className="flex-1 p-6 overflow-auto space-y-4">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[70%] p-4 rounded-lg ${
                    msg.from === "you"
                      ? "bg-indigo-600 text-white self-end"
                      : "bg-slate-100 text-slate-800 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200 flex items-center gap-4">
              <input
                type="text"
                className="flex-grow border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white rounded-xl px-4 py-2 hover:bg-indigo-700 flex items-center gap-2"
              >
                <FaPaperPlane /> Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-full text-slate-400">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
