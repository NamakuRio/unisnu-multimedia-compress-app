export default defineNuxtPlugin(() => {
  return {
    provide: {
      randomText(length = 16, timestamps?: boolean) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }

        if (timestamps) {
          const timestamp = Date.now();
          result = `${result}_${timestamp}`;
        }

        return result;
      },
    },
  };
});
