export async function getAuthenticatedAppForUser() {
    const authIdToken = (await cookies()).get("__session")?.value;
  
    // Firebase Server App is a new feature in the JS SDK that allows you to
    // instantiate the SDK with credentials retrieved from the client & has
    // other affordances for use in server environments.
    const firebaseServerApp = initializeServerApp(
      // https://github.com/firebase/firebase-js-sdk/issues/8863#issuecomment-2751401913
      initializeApp(),
      {
        authIdToken,
      }
    );
  
    const auth = getAuth(firebaseServerApp);
    await auth.authStateReady();
  
    return { firebaseServerApp, currentUser: auth.currentUser };
  }