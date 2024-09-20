import { Group, Radio } from "@mantine/core";
import React from "react";

type Props = {
  value: string;
  changed: (value: string) => void;
  data: {
    label: string;
    value: string;
  }[];
};

const RadioGroupComponent = ({ value, changed, data }: Props) => {
  return (
    <Radio.Group value={value} onChange={changed}>
      <Group>
        {data.map((el) => (
          <Radio
            label={el.label}
            key={el.value}
            value={el.value}
            color="#333333"
          />
        ))}
      </Group>
    </Radio.Group>
  );
};

export default RadioGroupComponent;
