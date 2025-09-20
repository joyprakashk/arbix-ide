"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

export function ArbitrumChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hi! I'm your Arbitrum assistant. Ask me about Arbitrum development, deployment, or any technical questions!",
    },
  ])
  const [input, setInput] = useState("")

  const arbitrumKnowledge = {
    "what is arbitrum":
      "Arbitrum is a Layer 2 scaling solution for Ethereum that uses optimistic rollups to provide faster and cheaper transactions while maintaining Ethereum's security.",
    "how to deploy":
      "To deploy on Arbitrum: 1) Configure your network settings, 2) Get testnet ETH from faucet, 3) Use Arbix IDE or Hardhat to deploy, 4) Verify your contract on Arbiscan.",
    "gas fees":
      "Arbitrum significantly reduces gas fees compared to Ethereum mainnet, typically 90-95% lower costs while maintaining the same security guarantees.",
    "getting started":
      "Start with Arbitrum by: 1) Setting up MetaMask for Arbitrum networks, 2) Getting testnet tokens, 3) Using Arbix IDE for development, 4) Reading the official docs.",
    "arbitrum one":
      "Arbitrum One is the main Arbitrum network, fully compatible with Ethereum. It's production-ready and supports all Ethereum tools and dApps.",
    "arbitrum nova":
      "Arbitrum Nova is optimized for gaming and social applications, offering even lower costs with AnyTrust technology.",
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { type: "user", content: input }
    const lowerInput = input.toLowerCase()

    let botResponse =
      "I'd be happy to help! For detailed information, please check the Arbitrum documentation or ask about specific topics like deployment, gas fees, or getting started."

    for (const [key, value] of Object.entries(arbitrumKnowledge)) {
      if (lowerInput.includes(key)) {
        botResponse = value
        break
      }
    }

    setMessages((prev) => [...prev, userMessage, { type: "bot", content: botResponse }])
    setInput("")
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="lg" className="rounded-full h-14 w-14 shadow-lg">
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="shadow-2xl border-2">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">Arbitrum Assistant</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Arbitrum..."
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
