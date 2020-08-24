import styled from "styled-components";
import React from "react";

export type ItemId = string;

export interface dropDownItem {
  id: ItemId;
  content: string;
}

const DropDownWrapper = styled.div``;

interface Props {
  title: string;
  items: dropDownItem[];
  selectedItemId: ItemId;
  onChange: (selectedItemId: ItemId) => void;
}

const CustomDropDown: React.FC<Props> = (props) => {
  return (
    <DropDownWrapper>
      {props.title}
      <select
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      >
        {props.items.map((item) => {
          return (
            <option
              value={item.id}
              key={item.id}
              selected={item.id === props.selectedItemId}
            >
              {item.content}
            </option>
          );
        })}
      </select>
    </DropDownWrapper>
  );
};

export default CustomDropDown;
