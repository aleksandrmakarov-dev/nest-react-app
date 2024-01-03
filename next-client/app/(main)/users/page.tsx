"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/shared/ui/button";

export default function UsersPage() {
  const [value, setValue] = useState<any>();

  const fetch = async () => {
    try {
      const response = await axios.get("users");
      setValue(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Button onClick={fetch}>Fetch</Button>
      <div>
        <h5 className="mb-5 font-semibold text-lg">Users</h5>
        <ul>
          {value?.items?.map((item: any, i: any) => (
            <li key={i}>
              {item.email} {item.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
