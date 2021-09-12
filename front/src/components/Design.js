import React, { Fragment } from "react";
import { Grid, Image, Text } from "../elements";
import { paddingStyle } from "../utils/styleUtils";
import moment from "moment";

const Design = memo((props) => {
  const { user_info, contents, image_url, insert_dt } = props;

  return (
    <Grid>
      <Grid is_flex padding="0 0 8px 0">
        <Grid is_flex justify="flex-start">
          <Image border="1px solid #999" shape="circle" src={user_info.user_profile} padding={paddingStyle.right8} />
          <Text padding={paddingStyle.right8} bold>
            {user_info.user_name}
          </Text>
        </Grid>
        <Grid is_flex justify="flex-end">
          <Text size="13px" color="#c4c4c4">{moment(insert_dt).format("YYYY.MM.DD HH:mm")}</Text>
        </Grid>
      </Grid>
      <Grid>
        <Image bgSize="cover" size="550px" shape="rectangle" src={image_url} />
      </Grid>
      <Grid padding="16px">
        <Text align="start">{contents}</Text>
      </Grid>
    </Grid>
  );
});

Design.defaultProps = {
  user_info: {
    user_id: "",
    user_profile: "",
    user_name: "thisisneverthat",
  },
  src: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  contents: "귀여운 강아지 입니다용",
  insert_dt: new Date(),
};

export default Design;
