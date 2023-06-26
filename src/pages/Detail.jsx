import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);

  const reviews = useSelector((state) => state.reviews);
  const review = reviews.filter((review) => review.id === id)[0];

  const [contents, setContents] = useState("");

  const todo = todos.filter((todo) => todo.id === id)[0];

  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="글 작성"
        value={contents}
        onChange={(e) => {
          setContents(e.target.value);
        }}
      ></input>

      <p>id:{todo.id}</p>
      <br />
      {todo.title}
      <br />
      {todo.body}
      <br />
      {todo.isDone.toString()}
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
      <button
        onSubmit={(e) => {
          if (!contents) {
            alert("필수값이 누락되었습니다. 확인해주세요.");
            return false;
          }

          e.preventDefault();

          dispatch({
            type: "ADD_REVIEW",
            payload: {
              id: shortid.generate(),
              contents,
            },
          });

          setContents("");
        }}
      >
        추가
      </button>

      <div>
        <h3>리뷰 리스트</h3>
        <div>{id}</div>
        <div>
          {reviews.map((item) => {
            return (
              <>
                {item.contents}
                <button
                  onClick={() => {
                    dispatch({
                      type: "DELETE_REVIEW",
                      payload: review.id,
                    });
                  }}
                >
                  삭제
                </button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
