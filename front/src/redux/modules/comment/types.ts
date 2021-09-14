import { User } from "../users/types";

interface GetCommentFB {
  post_id: string;
}

interface DelCommentFB {
  comment_id: string;
  post_id: string;
}

interface AddCommentFB extends GetCommentFB {
  contents: string;
}

interface Comment extends User, AddCommentFB {
  insert_dt: string;
  id: string;
}


export { Comment, GetCommentFB, DelCommentFB, AddCommentFB };
