import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LoaderCircle } from "lucide-react";
import { VBox } from "../components/directional/flex";
import RegistrationService from "../services/RegistrationService";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const { publicKey, connect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const params = useParams();

  const handleConnectWallet = async () => {
    if (!connected) {
      setVisible(true);
      await connect();
    }
  };

  const [formData, setFormData] = useState({
    wallet: "",
    name: "",
    by: params.code ?? "",
  });

  useEffect(() => {
    if (!connected) {
      setVisible(true);
    }
  }, [connected, setVisible]);

  useEffect(() => {
    if (publicKey) {
      setFormData((prevData) => ({
        ...prevData,
        wallet: publicKey.toBase58(),
      }));
      const checkExistence = async () => {
        const exists = await RegistrationService.checkExistence(
          publicKey.toBase58()
        );
        if (exists) {
          navigate("/dashboard/profile", { replace: true });
        } else {
          if (ref.current) {
            ref.current.style.display = "block";
          }
        }
      };
      checkExistence();
    } else {
      setFormData((prevData) => ({
        ...prevData,
        by: params.code ?? "",
      }));
      if (ref.current) {
        ref.current.style.display = "none";
      }
    }
  }, [publicKey, navigate, params.code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, wallet, by } = formData;
    if (!name || !wallet) {
      alert("Name and wallet are required");
      setLoading(false);
      return;
    }

    try {
      const exists = await RegistrationService.checkExistence(wallet);
      if (exists) {
        navigate("/dashboard/profile");
      } else {
        await RegistrationService.registerUser({ name, wallet, by });
        navigate("/dashboard/profile", { state: { from: "registration" } });
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
    setLoading(false);
  };

  return (
    <VBox
      alignItems="center"
      justifyContent="center"
      className="rounded-xl bg-white/10 backdrop-blur-lg bgballs w-screen h-screen"
    >
      {publicKey ? (
        <VBox>
          <div
            ref={ref}
            className="hidden max-w-lg mx-auto bg-white/5 p-6 rounded-lg shadow-md mb-6"
          >
            <VBox gap={24}>
              <div className="bg-white/10 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#85CD4F]">
                {publicKey.toBase58()}
              </div>
              <input
                className="bg-white/10 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#85CD4F]"
                required
                name="name"
                type="text"
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                className="bg-white/10 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-[#85CD4F]"
                name="by"
                type="text"
                onChange={handleChange}
                placeholder="Referral Code (Optional)"
                defaultValue={params.code ?? ""}
                readOnly
              />
              <button
                onClick={registerUser}
                className="bg-[#85CD4F] text-center px-6 py-2 hover:bg-red-600 text-white rounded-full font-semibold transition duration-300"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <span>Proceed Registration</span>
                )}
              </button>
            </VBox>
          </div>
        </VBox>
      ) : (
        <VBox alignItems="center">
          <p className="text-white text-center">
            Please connect your wallet to proceed.
          </p>
          <div>
            <button onClick={handleConnectWallet}>Connect Wallet</button>
          </div>
        </VBox>
      )}
    </VBox>
  );
};

export default RegistrationPage;
