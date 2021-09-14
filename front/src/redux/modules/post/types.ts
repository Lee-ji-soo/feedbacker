interface Post {
  image_url: string;
  contents: string;
  comment_cnt : number;
  insert_dt: string;
}

interface AddPostFB {
  contents?: string;
}

interface UpdatePostFB extends AddPostFB {
  id: string;
}

export { Post, AddPostFB, UpdatePostFB };