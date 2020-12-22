export const order = {
  _id: !String,
  buyer: {
    address: !String,
    city: !String,
    province: !String,
  },
  items: [
    {
      name: !String,
      price: !Number,
    },
  ],
  total: !Number,
  buyDate: !Date,
};
