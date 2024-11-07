# UOTech MERN Stack Project-1

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });

        localStorage.setItem("auth", JSON.stringify(data))

        navigate(location.state || "/");
      }
    } catch (error) {
      console.log(error);
      alert("Error in Login");
    }
  };