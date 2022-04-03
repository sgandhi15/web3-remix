var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// server.js
var import_express = __toESM(require("express"));
var import_compression = __toESM(require("compression"));
var import_morgan = __toESM(require("morgan"));
var import_express2 = require("@remix-run/express");

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:C:\Users\gandh\dev\web3-remix-boilerplate\app\root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement(import_react2.Outlet, null), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null)));
}

// route:C:\Users\gandh\dev\web3-remix-boilerplate\app\routes\index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});

// app/components/MetamaskLoginButton.tsx
var import_ethers = require("ethers");
var import_react5 = require("react");

// app/context/metamask/MetamaskProvider.tsx
var import_react4 = require("react");

// app/context/metamask/MetamaskContext.ts
var import_react3 = require("react");
var MetamaskContext = (0, import_react3.createContext)(void 0);

// app/context/metamask/MetamaskProvider.tsx
function metamaskReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return __spreadProps(__spreadValues({}, state), {
        provider: action.payload.provider,
        account: action.payload.account,
        signer: action.payload.signer
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function MetamaskProvider({ children }) {
  const [state, dispatch] = (0, import_react4.useReducer)(metamaskReducer, {
    account: "",
    signer: {},
    provider: {}
  });
  const value = { state, dispatch };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MetamaskContext.Provider, {
    value
  }, children));
}
function useMetamask() {
  const context = (0, import_react4.useContext)(MetamaskContext);
  if (context === void 0) {
    throw new Error("useMetamask must be used within a MetamaskProvider");
  }
  return context;
}

// app/components/MetamaskLoginButton.tsx
function MetamaskLoginButton() {
  const { dispatch } = useMetamask();
  const [balance, setBalance] = (0, import_react5.useState)("0");
  (0, import_react5.useEffect)(() => {
    if (typeof window.ethereum === "undefined") {
      window.alert("Metamask is not available");
    }
  });
  async function onClick() {
    const provider = new import_ethers.ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    setBalance(import_ethers.ethers.utils.formatEther(await provider.getBalance("ricmoo.eth")));
    dispatch({ type: "LOGIN", payload: { account, signer, provider } });
  }
  const transaction = async (account) => {
    const provider = new import_ethers.ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      await signer.sendTransaction({
        to: account,
        value: import_ethers.ethers.utils.parseEther("0")
      });
    } catch (error) {
      if (error.code === 4001)
        alert(error.message);
      else
        console.error(error.message);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    onClick
  }, "Click Me"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => transaction("0xe0f169006426142972f1a5C2b2B1fB15211D53a1")
  }, "Transaction"), /* @__PURE__ */ React.createElement("h1", null, balance));
}

// route:C:\Users\gandh\dev\web3-remix-boilerplate\app\routes\index.tsx
function Index() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(MetamaskProvider, null, /* @__PURE__ */ React.createElement(MetamaskLoginButton, null)));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "f0e97b9b", "entry": { "module": "/build/entry.client-L2IQAD35.js", "imports": ["/build/_shared/chunk-ZPB5GS42.js", "/build/_shared/chunk-XV23MX66.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-WTMLDRB5.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-JEH6ASUN.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-F0E97B9B.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};

// server.js
var app = (0, import_express.default)();
app.use((0, import_compression.default)());
app.disable("x-powered-by");
app.use("/build", import_express.default.static("public/build", { immutable: true, maxAge: "1y" }));
app.use(import_express.default.static("public", { maxAge: "1h" }));
app.use((0, import_morgan.default)("tiny"));
app.all("*", (0, import_express2.createRequestHandler)({
  build: server_build_exports,
  mode: "development"
}));
var port = process.env.PORT || 3e3;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0ByZW1peC1ydW4vZGV2L2NvbXBpbGVyL3NoaW1zL3JlYWN0LnRzIiwgIi4uL3NlcnZlci5qcyIsICJzZXJ2ZXItZW50cnktbW9kdWxlOkByZW1peC1ydW4vZGV2L3NlcnZlci1idWlsZCIsICIuLi9hcHAvZW50cnkuc2VydmVyLnRzeCIsICJyb3V0ZTpDOlxcVXNlcnNcXGdhbmRoXFxkZXZcXHdlYjMtcmVtaXgtYm9pbGVycGxhdGVcXGFwcFxccm9vdC50c3giLCAicm91dGU6QzpcXFVzZXJzXFxnYW5kaFxcZGV2XFx3ZWIzLXJlbWl4LWJvaWxlcnBsYXRlXFxhcHBcXHJvdXRlc1xcaW5kZXgudHN4IiwgIi4uL2FwcC9jb21wb25lbnRzL01ldGFtYXNrTG9naW5CdXR0b24udHN4IiwgIi4uL2FwcC9jb250ZXh0L21ldGFtYXNrL01ldGFtYXNrUHJvdmlkZXIudHN4IiwgIi4uL2FwcC9jb250ZXh0L21ldGFtYXNrL01ldGFtYXNrQ29udGV4dC50cyIsICJzZXJ2ZXItYXNzZXRzLW1hbmlmZXN0OkByZW1peC1ydW4vZGV2L2Fzc2V0cy1tYW5pZmVzdCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgeyBSZWFjdCB9O1xuIiwgImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSBcImNvbXByZXNzaW9uXCI7XG5pbXBvcnQgbW9yZ2FuIGZyb20gXCJtb3JnYW5cIjtcbmltcG9ydCB7IGNyZWF0ZVJlcXVlc3RIYW5kbGVyIH0gZnJvbSBcIkByZW1peC1ydW4vZXhwcmVzc1wiO1xuaW1wb3J0ICogYXMgc2VydmVyQnVpbGQgZnJvbSBcIkByZW1peC1ydW4vZGV2L3NlcnZlci1idWlsZFwiO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XG5cbi8vIGh0dHA6Ly9leHByZXNzanMuY29tL2VuL2FkdmFuY2VkL2Jlc3QtcHJhY3RpY2Utc2VjdXJpdHkuaHRtbCNhdC1hLW1pbmltdW0tZGlzYWJsZS14LXBvd2VyZWQtYnktaGVhZGVyXG5hcHAuZGlzYWJsZShcIngtcG93ZXJlZC1ieVwiKTtcblxuLy8gUmVtaXggZmluZ2VycHJpbnRzIGl0cyBhc3NldHMgc28gd2UgY2FuIGNhY2hlIGZvcmV2ZXIuXG5hcHAudXNlKFxuICBcIi9idWlsZFwiLFxuICBleHByZXNzLnN0YXRpYyhcInB1YmxpYy9idWlsZFwiLCB7IGltbXV0YWJsZTogdHJ1ZSwgbWF4QWdlOiBcIjF5XCIgfSlcbik7XG5cbi8vIEV2ZXJ5dGhpbmcgZWxzZSAobGlrZSBmYXZpY29uLmljbykgaXMgY2FjaGVkIGZvciBhbiBob3VyLiBZb3UgbWF5IHdhbnQgdG8gYmVcbi8vIG1vcmUgYWdncmVzc2l2ZSB3aXRoIHRoaXMgY2FjaGluZy5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoXCJwdWJsaWNcIiwgeyBtYXhBZ2U6IFwiMWhcIiB9KSk7XG5cbmFwcC51c2UobW9yZ2FuKFwidGlueVwiKSk7XG5cbmFwcC5hbGwoXG4gIFwiKlwiLFxuICBjcmVhdGVSZXF1ZXN0SGFuZGxlcih7XG4gICAgYnVpbGQ6IHNlcnZlckJ1aWxkLFxuICAgIG1vZGU6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxuICB9KVxuKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBFeHByZXNzIHNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9YCk7XG59KTtcbiIsICJcbmltcG9ydCAqIGFzIGVudHJ5U2VydmVyIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxnYW5kaFxcXFxkZXZcXFxcd2ViMy1yZW1peC1ib2lsZXJwbGF0ZVxcXFxhcHBcXFxcZW50cnkuc2VydmVyLnRzeFwiO1xuaW1wb3J0ICogYXMgcm91dGUwIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxnYW5kaFxcXFxkZXZcXFxcd2ViMy1yZW1peC1ib2lsZXJwbGF0ZVxcXFxhcHBcXFxccm9vdC50c3hcIjtcbmltcG9ydCAqIGFzIHJvdXRlMSBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcZ2FuZGhcXFxcZGV2XFxcXHdlYjMtcmVtaXgtYm9pbGVycGxhdGVcXFxcYXBwXFxcXHJvdXRlc1xcXFxpbmRleC50c3hcIjtcbiAgZXhwb3J0IHsgZGVmYXVsdCBhcyBhc3NldHMgfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXYvYXNzZXRzLW1hbmlmZXN0XCI7XG4gIGV4cG9ydCBjb25zdCBlbnRyeSA9IHsgbW9kdWxlOiBlbnRyeVNlcnZlciB9O1xuICBleHBvcnQgY29uc3Qgcm91dGVzID0ge1xuICAgIFwicm9vdFwiOiB7XG4gICAgICBpZDogXCJyb290XCIsXG4gICAgICBwYXJlbnRJZDogdW5kZWZpbmVkLFxuICAgICAgcGF0aDogXCJcIixcbiAgICAgIGluZGV4OiB1bmRlZmluZWQsXG4gICAgICBjYXNlU2Vuc2l0aXZlOiB1bmRlZmluZWQsXG4gICAgICBtb2R1bGU6IHJvdXRlMFxuICAgIH0sXG4gIFwicm91dGVzL2luZGV4XCI6IHtcbiAgICAgIGlkOiBcInJvdXRlcy9pbmRleFwiLFxuICAgICAgcGFyZW50SWQ6IFwicm9vdFwiLFxuICAgICAgcGF0aDogdW5kZWZpbmVkLFxuICAgICAgaW5kZXg6IHRydWUsXG4gICAgICBjYXNlU2Vuc2l0aXZlOiB1bmRlZmluZWQsXG4gICAgICBtb2R1bGU6IHJvdXRlMVxuICAgIH1cbiAgfTsiLCAiaW1wb3J0IHR5cGUgeyBFbnRyeUNvbnRleHQgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCI7XG5pbXBvcnQgeyBSZW1peFNlcnZlciB9IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCI7XG5pbXBvcnQgeyByZW5kZXJUb1N0cmluZyB9IGZyb20gXCJyZWFjdC1kb20vc2VydmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoXG4gIHJlcXVlc3Q6IFJlcXVlc3QsXG4gIHJlc3BvbnNlU3RhdHVzQ29kZTogbnVtYmVyLFxuICByZXNwb25zZUhlYWRlcnM6IEhlYWRlcnMsXG4gIHJlbWl4Q29udGV4dDogRW50cnlDb250ZXh0XG4pIHtcbiAgbGV0IG1hcmt1cCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxSZW1peFNlcnZlciBjb250ZXh0PXtyZW1peENvbnRleHR9IHVybD17cmVxdWVzdC51cmx9IC8+XG4gICk7XG5cbiAgcmVzcG9uc2VIZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvaHRtbFwiKTtcblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiPCFET0NUWVBFIGh0bWw+XCIgKyBtYXJrdXAsIHtcbiAgICBzdGF0dXM6IHJlc3BvbnNlU3RhdHVzQ29kZSxcbiAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gIH0pO1xufVxuIiwgImltcG9ydCB0eXBlIHsgTWV0YUZ1bmN0aW9uIH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiO1xuaW1wb3J0IHtcbiAgTGlua3MsXG4gIExpdmVSZWxvYWQsXG4gIE1ldGEsXG4gIE91dGxldCxcbiAgU2NyaXB0cyxcbiAgU2Nyb2xsUmVzdG9yYXRpb24sXG59IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBtZXRhOiBNZXRhRnVuY3Rpb24gPSAoKSA9PiAoe1xuICBjaGFyc2V0OiBcInV0Zi04XCIsXG4gIHRpdGxlOiBcIk5ldyBSZW1peCBBcHBcIixcbiAgdmlld3BvcnQ6IFwid2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MVwiLFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8aHRtbCBsYW5nPVwiZW5cIj5cbiAgICAgIDxoZWFkPlxuICAgICAgICA8TWV0YSAvPlxuICAgICAgICA8TGlua3MgLz5cbiAgICAgIDwvaGVhZD5cbiAgICAgIDxib2R5PlxuICAgICAgICA8T3V0bGV0IC8+XG4gICAgICAgIDxTY3JvbGxSZXN0b3JhdGlvbiAvPlxuICAgICAgICA8U2NyaXB0cyAvPlxuICAgICAgICA8TGl2ZVJlbG9hZCAvPlxuICAgICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBNZXRhbWFza0xvZ2luQnV0dG9uIH0gZnJvbSBcIn4vY29tcG9uZW50cy9NZXRhbWFza0xvZ2luQnV0dG9uXCI7XG5pbXBvcnQgeyBNZXRhbWFza1Byb3ZpZGVyIH0gZnJvbSBcIn4vY29udGV4dC9tZXRhbWFzay9NZXRhbWFza1Byb3ZpZGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEluZGV4KCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8TWV0YW1hc2tQcm92aWRlcj5cbiAgICAgICAgPE1ldGFtYXNrTG9naW5CdXR0b24gLz5cbiAgICAgIDwvTWV0YW1hc2tQcm92aWRlcj5cbiAgICA8Lz5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBldGhlcnMgfSBmcm9tIFwiZXRoZXJzXCI7XHJcblxyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZU1ldGFtYXNrIH0gZnJvbSBcIn4vY29udGV4dC9tZXRhbWFzay9NZXRhbWFza1Byb3ZpZGVyXCI7XHJcblxyXG5kZWNsYXJlIGxldCB3aW5kb3c6IGFueTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNZXRhbWFza0xvZ2luQnV0dG9uKCkge1xyXG4gIGNvbnN0IHsgZGlzcGF0Y2ggfSA9IHVzZU1ldGFtYXNrKCk7XHJcblxyXG4gIGNvbnN0IFtiYWxhbmNlLCBzZXRCYWxhbmNlXSA9IHVzZVN0YXRlPHN0cmluZz4oXCIwXCIpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuZXRoZXJldW0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgd2luZG93LmFsZXJ0KFwiTWV0YW1hc2sgaXMgbm90IGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gb25DbGljaygpIHtcclxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuV2ViM1Byb3ZpZGVyKHdpbmRvdy5ldGhlcmV1bSk7XHJcblxyXG4gICAgYXdhaXQgcHJvdmlkZXIuc2VuZChcImV0aF9yZXF1ZXN0QWNjb3VudHNcIiwgW10pO1xyXG5cclxuICAgIGNvbnN0IHNpZ25lciA9IHByb3ZpZGVyLmdldFNpZ25lcigpO1xyXG5cclxuICAgIGNvbnN0IGFjY291bnQgPSBhd2FpdCBzaWduZXIuZ2V0QWRkcmVzcygpO1xyXG5cclxuICAgIHNldEJhbGFuY2UoXHJcbiAgICAgIGV0aGVycy51dGlscy5mb3JtYXRFdGhlcihhd2FpdCBwcm92aWRlci5nZXRCYWxhbmNlKFwicmljbW9vLmV0aFwiKSlcclxuICAgICk7XHJcbiAgICBkaXNwYXRjaCh7IHR5cGU6IFwiTE9HSU5cIiwgcGF5bG9hZDogeyBhY2NvdW50LCBzaWduZXIsIHByb3ZpZGVyIH0gfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0cmFuc2FjdGlvbiA9IGFzeW5jIChhY2NvdW50OiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuV2ViM1Byb3ZpZGVyKHdpbmRvdy5ldGhlcmV1bSk7XHJcbiAgICBjb25zdCBzaWduZXIgPSBwcm92aWRlci5nZXRTaWduZXIoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHNpZ25lci5zZW5kVHJhbnNhY3Rpb24oe1xyXG4gICAgICAgIHRvOiBhY2NvdW50LFxyXG4gICAgICAgIHZhbHVlOiBldGhlcnMudXRpbHMucGFyc2VFdGhlcihcIjBcIiksXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDAwMSkgYWxlcnQoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgIGVsc2UgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfT5DbGljayBNZTwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIG9uQ2xpY2s9eygpID0+XHJcbiAgICAgICAgICB0cmFuc2FjdGlvbihcIjB4ZTBmMTY5MDA2NDI2MTQyOTcyZjFhNUMyYjJCMWZCMTUyMTFENTNhMVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgPlxyXG4gICAgICAgIFRyYW5zYWN0aW9uXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8aDE+e2JhbGFuY2V9PC9oMT5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIGNvbnN0IG5ldHdvcmtEYXRhOiBhbnkgPSBNYXJrZXRwbGFjZURhdGEubmV0d29ya3NbbmV0d29ya0lkXTtcclxuLy8gaWYgKG5ldHdvcmtEYXRhKSB7XHJcbi8vICAgY29uc3QgbWFya2V0cGxhY2UgPSBuZXcgd2ViMy5ldGguQ29udHJhY3QoXHJcbi8vICAgICBNYXJrZXRwbGFjZURhdGEuYWJpLFxyXG4vLyAgICAgbmV0d29ya0RhdGEuYWRkcmVzc1xyXG4vLyAgICk7XHJcbi8vICAgc2V0TWFya2V0cGxhY2UobWFya2V0cGxhY2UpO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlUmVkdWNlciB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgTWV0YW1hc2tDb250ZXh0IH0gZnJvbSBcIi4vTWV0YW1hc2tDb250ZXh0XCI7XHJcbmltcG9ydCB0eXBlIHsgQWN0aW9uLCBTdGF0ZSB9IGZyb20gXCIuL01ldGFtYXNrQ29udGV4dFwiO1xyXG5cclxudHlwZSBDb3VudFByb3ZpZGVyUHJvcHMgPSB7IGNoaWxkcmVuOiBSZWFjdE5vZGUgfTtcclxuXHJcbmZ1bmN0aW9uIG1ldGFtYXNrUmVkdWNlcihzdGF0ZTogU3RhdGUsIGFjdGlvbjogQWN0aW9uKSB7XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcIkxPR0lOXCI6IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICBwcm92aWRlcjogYWN0aW9uLnBheWxvYWQucHJvdmlkZXIsXHJcbiAgICAgICAgYWNjb3VudDogYWN0aW9uLnBheWxvYWQuYWNjb3VudCxcclxuICAgICAgICBzaWduZXI6IGFjdGlvbi5wYXlsb2FkLnNpZ25lcixcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGRlZmF1bHQ6IHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmhhbmRsZWQgYWN0aW9uIHR5cGU6ICR7YWN0aW9uLnR5cGV9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDb250ZXh0IHByb3ZpZGVyXHJcbmZ1bmN0aW9uIE1ldGFtYXNrUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiBDb3VudFByb3ZpZGVyUHJvcHMpIHtcclxuICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXIobWV0YW1hc2tSZWR1Y2VyLCB7XHJcbiAgICBhY2NvdW50OiBcIlwiLFxyXG4gICAgc2lnbmVyOiB7fSxcclxuICAgIHByb3ZpZGVyOiB7fSxcclxuICB9KTtcclxuICBjb25zdCB2YWx1ZSA9IHsgc3RhdGUsIGRpc3BhdGNoIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8TWV0YW1hc2tDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L01ldGFtYXNrQ29udGV4dC5Qcm92aWRlcj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuXHJcbi8vIEN1c3RvbSBIb29rIGZvciBlYXNlXHJcbmZ1bmN0aW9uIHVzZU1ldGFtYXNrKCkge1xyXG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KE1ldGFtYXNrQ29udGV4dCk7XHJcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXNlTWV0YW1hc2sgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIE1ldGFtYXNrUHJvdmlkZXJcIik7XHJcbiAgfVxyXG4gIHJldHVybiBjb250ZXh0O1xyXG59XHJcblxyXG5leHBvcnQgeyBNZXRhbWFza1Byb3ZpZGVyLCB1c2VNZXRhbWFzayB9O1xyXG4iLCAiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQWN0aW9uID0geyB0eXBlOiBcIkxPR0lOXCI7IHBheWxvYWQ6IGFueSB9O1xyXG5leHBvcnQgdHlwZSBEaXNwYXRjaCA9IChhY3Rpb246IEFjdGlvbikgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgU3RhdGUgPSB7IHByb3ZpZGVyOiBhbnk7IHNpZ25lcjogYW55OyBhY2NvdW50OiBzdHJpbmcgfTtcclxuXHJcbmV4cG9ydCBjb25zdCBNZXRhbWFza0NvbnRleHQgPSBjcmVhdGVDb250ZXh0PFxyXG4gIHsgc3RhdGU6IFN0YXRlOyBkaXNwYXRjaDogRGlzcGF0Y2ggfSB8IHVuZGVmaW5lZFxyXG4+KHVuZGVmaW5lZCk7XHJcbiIsICJleHBvcnQgZGVmYXVsdCB7J3ZlcnNpb24nOidmMGU5N2I5YicsJ2VudHJ5Jzp7J21vZHVsZSc6Jy9idWlsZC9lbnRyeS5jbGllbnQtTDJJUUFEMzUuanMnLCdpbXBvcnRzJzpbJy9idWlsZC9fc2hhcmVkL2NodW5rLVpQQjVHUzQyLmpzJywnL2J1aWxkL19zaGFyZWQvY2h1bmstWFYyM01YNjYuanMnXX0sJ3JvdXRlcyc6eydyb290Jzp7J2lkJzoncm9vdCcsJ3BhcmVudElkJzp1bmRlZmluZWQsJ3BhdGgnOicnLCdpbmRleCc6dW5kZWZpbmVkLCdjYXNlU2Vuc2l0aXZlJzp1bmRlZmluZWQsJ21vZHVsZSc6Jy9idWlsZC9yb290LVdUTUxEUkI1LmpzJywnaW1wb3J0cyc6dW5kZWZpbmVkLCdoYXNBY3Rpb24nOmZhbHNlLCdoYXNMb2FkZXInOmZhbHNlLCdoYXNDYXRjaEJvdW5kYXJ5JzpmYWxzZSwnaGFzRXJyb3JCb3VuZGFyeSc6ZmFsc2V9LCdyb3V0ZXMvaW5kZXgnOnsnaWQnOidyb3V0ZXMvaW5kZXgnLCdwYXJlbnRJZCc6J3Jvb3QnLCdwYXRoJzp1bmRlZmluZWQsJ2luZGV4Jzp0cnVlLCdjYXNlU2Vuc2l0aXZlJzp1bmRlZmluZWQsJ21vZHVsZSc6Jy9idWlsZC9yb3V0ZXMvaW5kZXgtSkVINkFTVU4uanMnLCdpbXBvcnRzJzp1bmRlZmluZWQsJ2hhc0FjdGlvbic6ZmFsc2UsJ2hhc0xvYWRlcic6ZmFsc2UsJ2hhc0NhdGNoQm91bmRhcnknOmZhbHNlLCdoYXNFcnJvckJvdW5kYXJ5JzpmYWxzZX19LCd1cmwnOicvYnVpbGQvbWFuaWZlc3QtRjBFOTdCOUIuanMnfTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFlBQXVCOzs7QUNEdkIscUJBQW9CO0FBQ3BCLHlCQUF3QjtBQUN4QixvQkFBbUI7QUFDbkIsc0JBQXFDOzs7QUNIckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUNBLG1CQUE0QjtBQUM1QixvQkFBK0I7QUFFaEIsdUJBQ2IsU0FDQSxvQkFDQSxpQkFDQSxjQUNBO0FBQ0EsTUFBSSxTQUFTLGtDQUNYLG9DQUFDLDBCQUFEO0FBQUEsSUFBYSxTQUFTO0FBQUEsSUFBYyxLQUFLLFFBQVE7QUFBQTtBQUduRCxrQkFBZ0IsSUFBSSxnQkFBZ0I7QUFFcEMsU0FBTyxJQUFJLFNB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
