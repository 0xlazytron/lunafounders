import { useState } from 'react';

export default function LunaFAQ() {
  const [activeSection, setActiveSection] = useState('lunafounder');

  const mainStyle = {
    minHeight: "100vh",
    backgroundColor: "#080C12",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif"
  };

  const headerStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    fontFamily: "Krona One, sans-serif",
    background: "linear-gradient(to right, #FFF69F, #D5A554)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const contentContainerStyle = {
    width: "100%",
    maxWidth: "900px",
    marginBottom: "30px"
  };

  const tabContainerStyle = {
    display: "flex",
    marginBottom: "20px"
  };

  const tabStyle = (isActive) => ({
    flex: "1",
    padding: "12px 16px",
    backgroundColor: isActive ? "#2C3540" : "#1C222A",
    border: "none",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontFamily: "Krona One, sans-serif"
  });

  const tabLeftStyle = {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px"
  };

  const tabRightStyle = {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px"
  };

  const faqContainerStyle = {
    backgroundColor: "#1C222A",
    borderRadius: "8px",
    padding: "24px"
  };

  const faqHeaderStyle = {
    fontSize: "24px",
    marginBottom: "24px",
    fontFamily: "Krona One, sans-serif",
    background: "linear-gradient(to right, #FFF69F, #D5A554)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const faqItemStyle = {
    marginBottom: "20px"
  };

  const questionStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#D5A554"
  };

  const answerStyle = {
    fontSize: "16px",
    lineHeight: "1.6"
  };

  const lunaFounderFAQ = [
    {
      question: "Was ist ein LunaFounder NFT?",
      answer: "Ein LunaFounder NFT ist ein limitierter digitaler Vermögenswert auf der Solana-Blockchain. Er ermöglicht dir eine Beteiligung an LunaCasino und Zugang zu exklusiven Funktionen wie monatliche Lotterie-Tickets und Streamline-Boni."
    },
    {
      question: "Wie funktioniert die monatliche Gewinnbeteiligung?",
      answer: "15 % des Netto-Gewinns von LunaCasino werden monatlich an alle LunaFounder-NFT-Holder ausgeschüttet - anteilig nach NFT-Wert."
    },
    {
      question: "Was ist die Streamline und wie profitiere ich davon?",
      answer: "Die Streamline ist ein globales Ranglistensystem für LunaFounder-Holder. Ab einem NFT-Wert von 500 $ nimmst du automatisch teil und kannst dir zusätzliche Bonus-Ausschüttungen basierend auf deiner Platzierung sichern."
    },
    {
      question: "Wie bekomme ich meine monatlichen LunaLotto-Tickets?",
      answer: "Als NFT-Holder kannst du jeden Monat kostenlose Tickets selbst minten. Du zahlst nur die Transaktionsgebühr auf der Solana-Blockchain."
    },
    {
      question: "Wann kann ich mein NFT handeln?",
      answer: "Nach Abschluss des NFT-Verkaufs sind die LunaFounder NFTs frei handelbar auf allen gängigen Solana-NFT-Marktplätzen."
    },
    {
      question: "Wie viele LunaFounder NFTs gibt es?",
      answer: "Es gibt insgesamt 18.130 NFTs, aufgeteilt in sieben Kategorien - von 100 $ bis 50.000 $. Je höher der NFT-Wert, desto größer deine Beteiligung."
    },
    {
      question: "Welche Wallet wird benötigt?",
      answer: "Zur Nutzung benötigst du eine Solana-kompatible Wallet wie Phantom, Solflare oder Backpack."
    }
  ];

  const lunaLottoFAQ = [
    {
      question: "Was ist LunaLotto?",
      answer: "LunaLotto ist eine transparente Online-Lotterie auf der Solana-Blockchain. Alle Ziehungen erfolgen automatisiert per Smart Contract - nachvollziehbar, sicher und fair."
    },
    {
      question: "Wie viel kostet ein Ticket?",
      answer: "Ein Ticket kostet 5 $ in Kryptowährung. Es wird keine Gebühr erhoben - der volle Betrag geht in den Jackpot und die Gewinnerverteilung."
    },
    {
      question: "Wie funktionieren die Ziehungen?",
      answer: "Ziehungen finden regelmäßig statt. Die Gewinner werden zufällig durch einen Blockchain-basierten Zufallsmechanismus bestimmt und auf der Plattform veröffentlicht."
    },
    {
      question: "Wie erhalte ich meinen Gewinn?",
      answer: "Gewinne werden automatisch an die Wallet-Adresse ausgezahlt, mit der das Gewinner-Ticket gekauft wurde."
    },
    {
      question: "Welche Blockchain wird verwendet?",
      answer: "LunaLotto läuft ausschließlich auf der Solana-Blockchain, um schnelle Transaktionen und minimale Gebühren zu ermöglichen."
    },
    {
      question: "Wie funktioniert das Affiliate-Programm?",
      answer: "Das LunaLotto-Affiliate-System schüttet 30 % Provision auf Ticketkäufe aus - verteilt über 10 Ebenen. Beispiel: In der 1. Ebene erhältst du 12 %, danach gestaffelt bis zur 10. Ebene."
    },
    {
      question: "Kann ich kostenlos teilnehmen?",
      answer: "Ja. Inhaber von LunaFounder NFTs erhalten jeden Monat kostenlose Tickets. Zusätzlich gibt es regelmäßig Community-Aktionen und Gewinnspiele."
    }
  ];

  return (
    <div style={mainStyle}>
      <h1 style={headerStyle}>LunaFounder & LunaLotto</h1>

      <div style={contentContainerStyle}>
        <div style={tabContainerStyle}>
          <button 
            style={{...tabStyle(activeSection === 'lunafounder'), ...tabLeftStyle}}
            onClick={() => setActiveSection('lunafounder')}
          >
            LunaFounder
          </button>
          <button 
            style={{...tabStyle(activeSection === 'lunalotto'), ...tabRightStyle}}
            onClick={() => setActiveSection('lunalotto')}
          >
            LunaLotto
          </button>
        </div>

        <div style={faqContainerStyle}>
          {activeSection === 'lunafounder' && (
            <>
              <h2 style={faqHeaderStyle}>LunaFounder - Häufig gestellte Fragen</h2>
              {lunaFounderFAQ.map((item, index) => (
                <div key={index} style={faqItemStyle}>
                  <h3 style={questionStyle}>{item.question}</h3>
                  <p style={answerStyle}>{item.answer}</p>
                </div>
              ))}
            </>
          )}

          {activeSection === 'lunalotto' && (
            <>
              <h2 style={faqHeaderStyle}>LunaLotto - Häufig gestellte Fragen</h2>
              {lunaLottoFAQ.map((item, index) => (
                <div key={index} style={faqItemStyle}>
                  <h3 style={questionStyle}>{item.question}</h3>
                  <p style={answerStyle}>{item.answer}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}