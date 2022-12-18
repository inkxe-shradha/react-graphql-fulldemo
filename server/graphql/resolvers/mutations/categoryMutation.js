import Category from "../../../db/models/category.js";
import authorized from "../../../utils/authentication.js";

export const categoryMutation = {
  updateCategory: async (parent, { name, id }, context, info) => {
    try {
      const req = authorized(context);
      return await Category.findByIdAndUpdate(id, {
        $set: {
          name: name,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (parent, { id }, context, info) => {
    try {
      const req = authorized(context);
      return (await Category.findByIdAndDelete(id)) ? true : false;
    } catch (error) {
      throw error;
    }
  },
};
