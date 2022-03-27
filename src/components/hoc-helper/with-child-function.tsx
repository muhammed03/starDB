import React, { FC } from "react";

import { ItemListPropsType } from "../item-list/item-list";

const withChildFunction = (fn: any) => (Wrapped: FC<ItemListPropsType>) => {
  return (props: any) => {
    return <Wrapped {...props}>{fn}</Wrapped>;
  };
};

export default withChildFunction;
