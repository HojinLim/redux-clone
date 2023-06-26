// import uuid from "react-uuid";
import shortid from "shortid";

const initialState = [
  {
    id: shortid.generate(),
    contents: "안녕하세요."
  },
  {
    id: shortid.generate(),
    contents: "반가워요."
  },
  
];

// 리듀서
const reviews = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return [...state, action.payload];

    case "DELETE_REVIEW":
      return state.filter((review) => review.id !== action.payload);

    default:
      return state;
  }
};

export default reviews;
