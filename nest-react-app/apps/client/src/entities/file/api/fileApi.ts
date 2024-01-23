export const fileKeys = {
  files: {
    root: ["files"],
  },
  mutations: {
    upload: () => [...fileKeys.files.root, "upload"],
  },
};
