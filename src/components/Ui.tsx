/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

// Define types for helper functions and WebAuthn-related interfaces
function generateRandomChallenge(): Uint8Array {
  const length = 32;
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  return randomValues;
}

interface PublicKeyCredentialCreationOptionsExtended
  extends PublicKeyCredentialCreationOptions {
  challenge: Uint8Array;
  user: PublicKeyCredentialUserEntity & { id: Uint8Array };
  pubKeyCredParams: Array<PublicKeyCredentialParameters>;
  authenticatorSelection: AuthenticatorSelectionCriteria;
  attestation: AttestationConveyancePreference;
  extensions: AuthenticationExtensionsClientInputs;
}

interface PublicKeyCredentialRequestOptionsExtended
  extends PublicKeyCredentialRequestOptions {
  challenge: Uint8Array;
  allowCredentials: Array<PublicKeyCredentialDescriptor>;
}

async function createPasskey(): Promise<void> {
  if (
    !navigator.credentials ||
    !navigator.credentials.create ||
    !navigator.credentials.get
  ) {
    alert("Your browser does not support the Web Authentication API");
    return;
  }

  const publicKey: PublicKeyCredentialCreationOptionsExtended = {
    challenge: generateRandomChallenge(),
    rp: { name: "Progressier", id: window.location.hostname },
    user: {
      id: new Uint8Array(16),
      name: "johndoe@example.com",
      displayName: "John Doe",
    },
    pubKeyCredParams: [
      { type: "public-key", alg: -7 },
      { type: "public-key", alg: -257 },
    ],
    timeout: 60000,
    authenticatorSelection: {
      residentKey: "preferred",
      requireResidentKey: false,
      userVerification: "preferred",
    },
    attestation: "none",
    extensions: { credProps: true },
  };

  const credentials = (await navigator.credentials.create({
    publicKey,
  })) as PublicKeyCredential;

  if (credentials) {
    // In a real app, store credentials in the database
    (window as any).currentPasskey = credentials;

    console.log(credentials);

    // Update demo buttons
    const authenticateBtn = document.getElementById("authenticate-btn");
    const verifyBtn = document.getElementById("verify-btn");

    if (authenticateBtn) {
      authenticateBtn.innerHTML = "Authenticated";
      authenticateBtn.classList.add("disabled");
    }
    if (verifyBtn) {
      verifyBtn.classList.remove("disabled");
    }
  }
}

async function verifyPasskey(): Promise<void> {
  try {
    const publicKey: PublicKeyCredentialRequestOptionsExtended = {
      challenge: generateRandomChallenge(),
      allowCredentials: [
        { type: "public-key", id: (window as any).currentPasskey.rawId },
      ],
    };

    const credentials = (await navigator.credentials.get({
      publicKey,
    })) as PublicKeyCredential;

    console.log(credentials);
    alert("Biometric authentication successful!");
  } catch (err) {
    alert(err);
  }
}

const BiometricAuth: React.FC = () => {
  const handleRegister = async () => {
    // Call registerUser function
    await createPasskey();
  };

  const handleLogin = async () => {
    // Call authenticateUser function
    await verifyPasskey();
  };

  return (
    <div>
      <button className="text-white bg-red-700 p-3" onClick={handleRegister}>
        Register
      </button>
      <button className="text-white bg-blue-700 p-3" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default BiometricAuth;
