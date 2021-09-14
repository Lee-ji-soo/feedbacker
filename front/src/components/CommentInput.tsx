import * as React from "react";
import { useCallback, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements";
import { isLogined } from "../components/common/Permit";
import { paddingStyle } from "../utils/styleUtils";
import { actionCreators as commentActions } from "../redux/modules/comment";

interface CommentInputProps {
  id: string;
}

const CommentInput = memo((props: CommentInputProps) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = useState<string>("");
  const { id } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    setCommentText("");
    dispatch(
      commentActions.addCommentFB({ post_id: id, contents: comment_text })
    );
  };

  const handleInputChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Grid is_flex justify="center" height="maxcontent">
      {isLogined() ? (
        <Input
          width="90%"
          placeholder="디자이너가 피드백을 기다리고 있습니다!"
          padding={paddingStyle.surround10}
          value={comment_text}
          _onChange={handleInputChange}
        />
      ) : (
        <Input
          width="90%"
          placeholder="피드백을 남기기 위해 로그인해주세요!"
          padding={paddingStyle.surround10}
          value=""
        />
      )}
      <Button
        width="10%"
        bg="light"
        txt="⏃"
        size="25px"
        _onClick={handleSubmit}
      />
    </Grid>
  );
});

export default CommentInput;