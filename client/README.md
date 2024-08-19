     
    ```js
     <Toaster
        position="top-right"
        richColors
        toastOptions={{
          unstyled: true,
          classNames: {
            error: "bg-red-400  flex items-center px-4 py-3 rounded-md gap-2",
            success:
              "text-green-400 bg-green-500  flex items-center px-4 py-3 rounded-md gap-2",
            warning:
              "text-yellow-400 bg-yellow-500  flex items-center px-4 py-3 rounded-md gap-2",
            info: "bg-blue-400 text-blue-500 w-56 flex items-center px-4 py-3 rounded-md gap-2",
          },
        }}
      />
      ```