/* eslint-disable @typescript-eslint/no-explicit-any */
export const registerUser = async () => {
  if (
    navigator.credentials &&
    typeof navigator.credentials.create === "function"
  ) {
    const publicKey = {
      challenge: new Uint8Array(32), // Random challenge
      rp: {
        name: "Your App",
      },
      user: {
        id: new Uint8Array(16), // User ID
        name: "username@example.com",
        displayName: "User Display Name",
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7, // ECDSA with SHA-256
        },
      ],
      timeout: 60000,
      authenticatorSelection: {
        userVerification: "required",
      },
    } as any;

    await navigator.credentials.create({ publicKey });
    // Send `credential` to your server to save it
    // WebAuthn is supported
  } else {
    alert("Biometric authentication is not supported on this browser.");
  }
};

export const authenticateUser = async () => {
  const publicKey = {
    challenge: new Uint8Array(32), // Random challenge from server
    allowCredentials: [
      {
        id: new Uint8Array(32), // Credential ID
        type: "public-key",
      },
    ],
    timeout: 60000,
    userVerification: "required",
  } as any;

  await navigator.credentials.get({ publicKey });
  // Send `assertion` to your server for verification
};
