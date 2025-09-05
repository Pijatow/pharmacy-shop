// In frontend/src/app/login/page.tsx

// Make sure to get setUser from the store at the top of the component
const { setTokens, setUser } = useAuthStore();
// ...

async function onSubmit(data: LoginInput) {
  setErrorMessage(null);
  try {
    // 1. Log in and get tokens
    const { access, refresh } = await loginUser(data);
    setTokens(access, refresh);

    // 2. Immediately fetch user data
    const userData = await getMe();
    setUser(userData); // Save user to the store

    // 3. Redirect to homepage
    router.push("/");
  } catch (error: any) {
    setErrorMessage("ایمیل یا رمز عبور اشتباه است.");
    console.error("Login failed:", error);
  }
}
