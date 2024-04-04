"use client";

import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket, client } from "websocket";
import { v4 as uuidv4 } from "uuid";
import RuleComponent from "@/components/RuleComponent";

export default function Home() {
  const cloudHost = "https://meta.nxvms.com";
  const [loginStatus, setLoginStatus] = useState(false);
  const [eventRules, setEventRules] = useState([]);

  const buildOauthUrl = () => {
    const redirectUrl = new URL(`${cloudHost}/authorize`);
    redirectUrl.searchParams.set("redirect_url", window.location.href);
    redirectUrl.searchParams.set("client_id", "api-tool");
    return redirectUrl.toString();
  };

  const redirectOauthLogin = (cloudAuthUrl: string) => {
    window.location.href = cloudAuthUrl;
  };

  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  const postWrapper = (url: string, data: any) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.access_token && r.token_type === "bearer") {
          localStorage.setItem("taskAccessToken", r.access_token);
          setLoginStatus(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const getTokensWithCode = async (code: any) => {
    const data = {
      code,
      grant_type: "authorization_code",
      response_type: "token",
    };

    const tokens = await postWrapper(`${cloudHost}/oauth/token/`, data);
    return tokens;
  };

  if (code != null && !loginStatus) {
    localStorage.setItem("code", code);
    getTokensWithCode(code);
  }

  const handleLogin = async () => {
    const OauthUrl = buildOauthUrl();
    redirectOauthLogin(OauthUrl);
  };

  const handleGetEventRules = () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer nxcdb-eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRiNGE2NzNkLTlkNjMtNGMzYS1hODliLWM3Yzc5MTc3ZTFkYyJ9.eyJleHAiOjE3MTIyNjQ3MDcsInB3ZFRpbWUiOjE3MTIxNjExMjEsInNpZCI6ImQzN2ZlZTFmLWU3ZTYtNDI3MC05MGVkLWFiZTcxMzJmMzRmNSIsInR5cCI6ImFjY2Vzc1Rva2VuIiwiYXVkIjoiY2xvdWRTeXN0ZW1JZD02ZDE3MDM5YS0wYzMzLTRkNzMtYWM4MS1lYTlkOTNiMTA2YTIiLCJpYXQiOjE3MTIxNzgzMDcsInN1YiI6Im54ZGV2dGFza0BuZXR3b3Jrb3B0aXguY29tIiwiY2xpZW50X2lkIjoiIiwiaXNzIjoiY2RiIn0.BvdBRB-NJBkXhCQgQoonVNqIQYBQJ8IHVyzCtpCF_gwAO1c7cT-XEbnSRbrImjV6PLuxh24WvOx0TXbB9-FryaA3LKyX8msxjSpxD5QZNzgBIX0ntAGlMENMNtDSWFdBmOe4nktgZmj1pg_YbXUnvHi9H_NoGBPEUjEe8v0Rdl_vPcfGVkUAWl6opl6aMpZXl0NkTzRghLSowb_KP3SDsnSPo9K-XQNKJrVDJVIhq4ZVCnxcZ3R6rgm8HG3-AZCCBpef_hlv92__N8j0Jt87JLf45lLXwYFXRVQCNioRYSu6MJbed66KPN48f9uVOrqYaQ-kmAM0quebgzv2FlJsFA`,
      },
    };
    return fetch(
      `https://6d17039a-0c33-4d73-ac81-ea9d93b106a2.relay-la.vmsproxy.com/ec2/getEventRules?format=json&id=6d17039a-0c33-4d73-ac81-ea9d93b106a2`,
      options
    )
      .then((r) => r.json())
      .then((r) => {
        setEventRules(r);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateEventRules = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer nxcdb-eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRiNGE2NzNkLTlkNjMtNGMzYS1hODliLWM3Yzc5MTc3ZTFkYyJ9.eyJleHAiOjE3MTIyNjQ3MDcsInB3ZFRpbWUiOjE3MTIxNjExMjEsInNpZCI6ImQzN2ZlZTFmLWU3ZTYtNDI3MC05MGVkLWFiZTcxMzJmMzRmNSIsInR5cCI6ImFjY2Vzc1Rva2VuIiwiYXVkIjoiY2xvdWRTeXN0ZW1JZD02ZDE3MDM5YS0wYzMzLTRkNzMtYWM4MS1lYTlkOTNiMTA2YTIiLCJpYXQiOjE3MTIxNzgzMDcsInN1YiI6Im54ZGV2dGFza0BuZXR3b3Jrb3B0aXguY29tIiwiY2xpZW50X2lkIjoiIiwiaXNzIjoiY2RiIn0.BvdBRB-NJBkXhCQgQoonVNqIQYBQJ8IHVyzCtpCF_gwAO1c7cT-XEbnSRbrImjV6PLuxh24WvOx0TXbB9-FryaA3LKyX8msxjSpxD5QZNzgBIX0ntAGlMENMNtDSWFdBmOe4nktgZmj1pg_YbXUnvHi9H_NoGBPEUjEe8v0Rdl_vPcfGVkUAWl6opl6aMpZXl0NkTzRghLSowb_KP3SDsnSPo9K-XQNKJrVDJVIhq4ZVCnxcZ3R6rgm8HG3-AZCCBpef_hlv92__N8j0Jt87JLf45lLXwYFXRVQCNioRYSu6MJbed66KPN48f9uVOrqYaQ-kmAM0quebgzv2FlJsFA`,
      },
      body: JSON.stringify({
        id: uuidv4(),
        eventType: "undefinedEvent",
        eventResourceIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        eventCondition: "",
        eventState: "undefined",
        actionType: "undefinedAction",
        actionResourceIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        actionParams: '{"field1": "value1","field2": "value2"}',
        aggregationPeriod: 0,
        disabled: false,
        comment: "",
        schedule: "fe7fffffffffffffffffffffffffffffffffffffff",
        system: true,
        EventState: "undefined",
      }),
    };
    return fetch(
      `https://6d17039a-0c33-4d73-ac81-ea9d93b106a2.relay-la.vmsproxy.com/ec2/saveEventRule`,
      options
    )
      .then((r) => r.json())
      .then((r: any) => {
        alert(`Event Rule created successfully, ${r.id}`);
      })
      .catch((err) => console.log(err));
  };

  const [messages, setMessages] = useState([]);

  const connectToWebSocket = async () => {
    try {
      // Define the WebSocket URL
      const url =
        "ws://6d17039a-0c33-4d73-ac81-ea9d93b106a2.dp-la-2.vmsproxy.com/ec2/transactionBus/websocket";

      // Establish WebSocket connection
      const client = new W3CWebSocket(
        url,
        [],
        "",
        {},
        {
          headers: {
            "X-Runtime-GUID":
              "nxcdb-eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRiNGE2NzNkLTlkNjMtNGMzYS1hODliLWM3Yzc5MTc3ZTFkYyJ9.eyJleHAiOjE3MTIyNjQ3MDcsInB3ZFRpbWUiOjE3MTIxNjExMjEsInNpZCI6ImQzN2ZlZTFmLWU3ZTYtNDI3MC05MGVkLWFiZTcxMzJmMzRmNSIsInR5cCI6ImFjY2Vzc1Rva2VuIiwiYXVkIjoiY2xvdWRTeXN0ZW1JZD02ZDE3MDM5YS0wYzMzLTRkNzMtYWM4MS1lYTlkOTNiMTA2YTIiLCJpYXQiOjE3MTIxNzgzMDcsInN1YiI6Im54ZGV2dGFza0BuZXR3b3Jrb3B0aXguY29tIiwiY2xpZW50X2lkIjoiIiwiaXNzIjoiY2RiIn0.BvdBRB-NJBkXhCQgQoonVNqIQYBQJ8IHVyzCtpCF_gwAO1c7cT-XEbnSRbrImjV6PLuxh24WvOx0TXbB9-FryaA3LKyX8msxjSpxD5QZNzgBIX0ntAGlMENMNtDSWFdBmOe4nktgZmj1pg_YbXUnvHi9H_NoGBPEUjEe8v0Rdl_vPcfGVkUAWl6opl6aMpZXl0NkTzRghLSowb_KP3SDsnSPo9K-XQNKJrVDJVIhq4ZVCnxcZ3R6rgm8HG3-AZCCBpef_hlv92__N8j0Jt87JLf45lLXwYFXRVQCNioRYSu6MJbed66KPN48f9uVOrqYaQ-kmAM0quebgzv2FlJsFA",
          },
        }
      );

      var requestOptions = {
        "X-Runtime-GUID":
          "nxcdb-eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRiNGE2NzNkLTlkNjMtNGMzYS1hODliLWM3Yzc5MTc3ZTFkYyJ9.eyJleHAiOjE3MTIyNjQ3MDcsInB3ZFRpbWUiOjE3MTIxNjExMjEsInNpZCI6ImQzN2ZlZTFmLWU3ZTYtNDI3MC05MGVkLWFiZTcxMzJmMzRmNSIsInR5cCI6ImFjY2Vzc1Rva2VuIiwiYXVkIjoiY2xvdWRTeXN0ZW1JZD02ZDE3MDM5YS0wYzMzLTRkNzMtYWM4MS1lYTlkOTNiMTA2YTIiLCJpYXQiOjE3MTIxNzgzMDcsInN1YiI6Im54ZGV2dGFza0BuZXR3b3Jrb3B0aXguY29tIiwiY2xpZW50X2lkIjoiIiwiaXNzIjoiY2RiIn0.BvdBRB-NJBkXhCQgQoonVNqIQYBQJ8IHVyzCtpCF_gwAO1c7cT-XEbnSRbrImjV6PLuxh24WvOx0TXbB9-FryaA3LKyX8msxjSpxD5QZNzgBIX0ntAGlMENMNtDSWFdBmOe4nktgZmj1pg_YbXUnvHi9H_NoGBPEUjEe8v0Rdl_vPcfGVkUAWl6opl6aMpZXl0NkTzRghLSowb_KP3SDsnSPo9K-XQNKJrVDJVIhq4ZVCnxcZ3R6rgm8HG3-AZCCBpef_hlv92__N8j0Jt87JLf45lLXwYFXRVQCNioRYSu6MJbed66KPN48f9uVOrqYaQ-kmAM0quebgzv2FlJsFA",
      };

      // Handle incoming messages
      client.onmessage = (message: any) => {
        const data = JSON.parse(message.data);
        // const { command, params } = data.tran;
        // setMessages((prevMessages) => [...prevMessages, { command, params }]);
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-w-full">
      <div className="flex items-center justify-between min-w-full p-10">
        <p>NxMeta</p>
        <button
          onClick={() => handleLogin()}
          className="rounded-full border-2 py-2 px-6"
        >
          Login
        </button>
      </div>
      {!loginStatus ? (
        <div className="flex items-center justify-around min-w-56 p-24">
          <button disabled className="rounded-full border-2 py-2 px-6">
            Check the Rule
          </button>
          <button disabled className="rounded-full border-2 py-2 px-6">
            Create the Rule
          </button>
          <button disabled className="rounded-full border-2 py-2 px-6">
            Connect to the alert Stream
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 min-w-56 p-24">
          <button
            onClick={(e) => handleGetEventRules()}
            className="rounded-full border-2 py-2 px-6"
          >
            Check the Rule
          </button>
          <button
            onClick={(e) => handleCreateEventRules()}
            className="rounded-full border-2 py-2 px-6"
          >
            Create the Rule
          </button>
          <button
            onClick={(e) => connectToWebSocket()}
            className="rounded-full border-2 py-2 px-6"
          >
            Connect to the alert Stream
          </button>
        </div>
      )}
      {eventRules.map((eventRule: any, index: number) => (
        <RuleComponent key={index} eventRule={eventRule} />
      ))}
    </main>
  );
}
