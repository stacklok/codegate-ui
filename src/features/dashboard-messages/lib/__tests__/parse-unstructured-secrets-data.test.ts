import { it } from "vitest";
import { parseUnstructuredSecretsData } from "../parse-unstructured-secrets-data";

const SECRETS_ALERTS_DATA = [
  {
    id: "e03ae066-7720-4926-be65-cb7ca39f5bd8",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: '; filepath: /Users/alexmcgovern/src/codegate-demonstration/conf.ini\nGITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"\nAWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: null,
      libraries: [],
      file_extension: null,
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: GitHub\n- Type: Access Token\n- Key: GITHUB_TOKEN\n- Line Number: 2\n- Context:\n```\n; filepath: /Users/alexmcgovern/src/codegate-demonstration/conf.ini\nGITHUB_TOKEN="REDACTED<$Zd/EcxDvBqoiS5sXYD+M9HiqMe24rESHlpt+rwqft0laQydrVmDTKSDMaBegRMJt70sIhLlWgQtWMQQfRgv3QvtFUY5rB0tJUMaxkUOg5g==>"\nAWS_ACCESS_KEY_ID="REDACTED<$HhZp9SPhgSXfOP5g5B7n7914LfVti/lxQylEcmEJvZmOb17ivsrWq6VjucGJHTgvi8YJx5yEy066s1U=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$twn1O8vAberMoWTwkCBQa8IC43aqNafNGacxiTNgRSHwQWOJr9yKeoWpty4yZhoxfBWNI3kw0+Kc1R1/KxINhO7SNMUZ07B4fzKHDbq8Kw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:47.522168Z",
  },
  {
    id: "65b2be5c-e031-4f2d-8e6c-ff3f3d7a8f1e",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: '; filepath: /Users/alexmcgovern/src/codegate-demonstration/conf.ini\nGITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"\nAWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: null,
      libraries: [],
      file_extension: null,
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: Amazon\n- Type: Access Key\n- Key: AWS_ACCESS_KEY_ID\n- Line Number: 3\n- Context:\n```\n; filepath: /Users/alexmcgovern/src/codegate-demonstration/conf.ini\nGITHUB_TOKEN="REDACTED<$Zd/EcxDvBqoiS5sXYD+M9HiqMe24rESHlpt+rwqft0laQydrVmDTKSDMaBegRMJt70sIhLlWgQtWMQQfRgv3QvtFUY5rB0tJUMaxkUOg5g==>"\nAWS_ACCESS_KEY_ID="REDACTED<$HhZp9SPhgSXfOP5g5B7n7914LfVti/lxQylEcmEJvZmOb17ivsrWq6VjucGJHTgvi8YJx5yEy066s1U=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$twn1O8vAberMoWTwkCBQa8IC43aqNafNGacxiTNgRSHwQWOJr9yKeoWpty4yZhoxfBWNI3kw0+Kc1R1/KxINhO7SNMUZ07B4fzKHDbq8Kw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:47.522146Z",
  },
  {
    id: "8d48ff1e-6feb-447f-82c5-21ad5d89ab53",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: '; filepath: /Users/alexmcgovern/src/codegate-demonstration/conf.ini\nGITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"\nAWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: null,
      libraries: [],
      file_extension: null,
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: High Entropy\n- Type: Potential Secret\n- Key: AWS_SECRET_ACCESS_KEY\n- Line Number: 4\n- Context:\n```\nGITHUB_TOKEN="REDACTED<$Zd/EcxDvBqoiS5sXYD+M9HiqMe24rESHlpt+rwqft0laQydrVmDTKSDMaBegRMJt70sIhLlWgQtWMQQfRgv3QvtFUY5rB0tJUMaxkUOg5g==>"\nAWS_ACCESS_KEY_ID="REDACTED<$HhZp9SPhgSXfOP5g5B7n7914LfVti/lxQylEcmEJvZmOb17ivsrWq6VjucGJHTgvi8YJx5yEy066s1U=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$twn1O8vAberMoWTwkCBQa8IC43aqNafNGacxiTNgRSHwQWOJr9yKeoWpty4yZhoxfBWNI3kw0+Kc1R1/KxINhO7SNMUZ07B4fzKHDbq8Kw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:47.522127Z",
  },
  {
    id: "5faea6cb-1fe7-4d2c-8bd1-f33a361cb4f5",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: null,
    trigger_string:
      '**Secret Detected** 🔒\n- Service: GitHub\n- Type: Access Token\n- Key: GITHUB_TOKEN\n- Line Number: 5\n- Context:\n```\nExcerpt from conf.ini, lines 1 to 4:\n```ini\nGITHUB_TOKEN="REDACTED<$p0nBrp3QSPMt7DypsFgSRdYfrbA3546N2a370UpV15EMHoo5XFeABiFYMt5R2IkoTGDB/FOFlrr3jVo1H9CJ0evRJHPbBhC1hXaQPjWk1A==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.086559Z",
  },
  {
    id: "2f29042b-fbdb-4722-96f5-597a73faf72e",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: 'AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: 'GITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"',
      libraries: [],
      file_extension: "",
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: Amazon\n- Type: Access Key\n- Key: AWS_ACCESS_KEY_ID\n- Line Number: 1\n- Context:\n```\nAWS_ACCESS_KEY_ID="REDACTED<$A9kjOiTR6L8YXNq8DXM/e7yv6omTWpglmBmIZOOrXNhPvmE9e6c6GOChWB1v6wRpboDO07Z45nuSMu4=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$ZC/eGkm6541ixJ48573XHvpBOumat4xhRyV8ROZwL3fgS2CHhi73g+kzYEkb/bkWS+tJajjICWm/1kXjQ6b0suL7PbcwnbJHKtkYcujWxw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.086190Z",
  },
  {
    id: "12e79095-192d-442a-9e7b-4e5f46f6e0dc",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: 'AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: 'GITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"',
      libraries: [],
      file_extension: "",
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: High Entropy\n- Type: Potential Secret\n- Key: AWS_SECRET_ACCESS_KEY\n- Line Number: 2\n- Context:\n```\nAWS_ACCESS_KEY_ID="REDACTED<$A9kjOiTR6L8YXNq8DXM/e7yv6omTWpglmBmIZOOrXNhPvmE9e6c6GOChWB1v6wRpboDO07Z45nuSMu4=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$ZC/eGkm6541ixJ48573XHvpBOumat4xhRyV8ROZwL3fgS2CHhi73g+kzYEkb/bkWS+tJajjICWm/1kXjQ6b0suL7PbcwnbJHKtkYcujWxw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.086178Z",
  },
  {
    id: "95df388c-54a6-4e3e-8f70-5ace465c9609",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: null,
    trigger_string:
      '**Secret Detected** 🔒\n- Service: GitHub\n- Type: Access Token\n- Key: GITHUB_TOKEN\n- Line Number: 5\n- Context:\n```\nExcerpt from conf.ini, lines 1 to 4:\n```ini\nGITHUB_TOKEN="REDACTED<$iPKajC6vbjifexEIptk0LcH0bOdsPaGcTKT5S5QmjzmnWFWfT3Ptmfq8c61oHV8D23qQVcLYRL+dK3Py/5tCc1qU2tyz/cfCMxPnbdhbJQ==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.078467Z",
  },
  {
    id: "4a0111a4-0a82-4cc7-98e0-3c4009456310",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: 'AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: 'GITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"',
      libraries: [],
      file_extension: "",
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: Amazon\n- Type: Access Key\n- Key: AWS_ACCESS_KEY_ID\n- Line Number: 1\n- Context:\n```\nAWS_ACCESS_KEY_ID="REDACTED<$DH3fMpVAb+fHZKz9hu437l6rN9VF1BXciCpk+q5OGGYTuXVWY1uCj44q7FsRF9jkNSNi/1bfUmjjwJg=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$iZF8W1J0R3ErViM/MyR6djFFWwZel1RO/doE8cw2ghEzu745MvYloawzN/FzXPPD2gRllBMR1Zi8cvdqDutHEKyMN1xXPCBoqAkyH6h2Cw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.077959Z",
  },
  {
    id: "03a66ff4-ef9c-49d0-9481-b5569ddc7cbf",
    prompt_id: "9fafdd84-0ea4-4bb7-8a94-92a24a1db22b",
    code_snippet: {
      code: 'AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"\nAWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"\n',
      language: null,
      filepath: 'GITHUB_TOKEN="ghp_aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789"',
      libraries: [],
      file_extension: "",
    },
    trigger_string:
      '**Secret Detected** 🔒\n- Service: High Entropy\n- Type: Potential Secret\n- Key: AWS_SECRET_ACCESS_KEY\n- Line Number: 2\n- Context:\n```\nAWS_ACCESS_KEY_ID="REDACTED<$DH3fMpVAb+fHZKz9hu437l6rN9VF1BXciCpk+q5OGGYTuXVWY1uCj44q7FsRF9jkNSNi/1bfUmjjwJg=>"\nAWS_SECRET_ACCESS_KEY="REDACTED<$iZF8W1J0R3ErViM/MyR6djFFWwZel1RO/doE8cw2ghEzu745MvYloawzN/FzXPPD2gRllBMR1Zi8cvdqDutHEKyMN1xXPCBoqAkyH6h2Cw==>"\n\n```',
    trigger_type: "codegate-secrets",
    trigger_category: "critical",
    timestamp: "2025-02-10T13:04:44.077941Z",
  },
];

it("should parse the unstructured secret alerts data correctly", () => {
  expect(SECRETS_ALERTS_DATA.map(parseUnstructuredSecretsData)).toStrictEqual([
    {
      key: "GITHUB_TOKEN",
      redactedValue:
        'GITHUB_TOKEN="REDACTED<$Zd/EcxDvBqoiS5sXYD+M9HiqMe24rESHlpt+rwqft0laQydrVmDTKSDMaBegRMJt70sIhLlWgQtWMQQfRgv3QvtFUY5rB0tJUMaxkUOg5g==>"',
    },
    {
      key: "AWS_ACCESS_KEY_ID",
      redactedValue:
        'AWS_ACCESS_KEY_ID="REDACTED<$HhZp9SPhgSXfOP5g5B7n7914LfVti/lxQylEcmEJvZmOb17ivsrWq6VjucGJHTgvi8YJx5yEy066s1U=>"',
    },
    {
      key: "AWS_SECRET_ACCESS_KEY",
      redactedValue:
        'AWS_SECRET_ACCESS_KEY="REDACTED<$twn1O8vAberMoWTwkCBQa8IC43aqNafNGacxiTNgRSHwQWOJr9yKeoWpty4yZhoxfBWNI3kw0+Kc1R1/KxINhO7SNMUZ07B4fzKHDbq8Kw==>"',
    },
    {
      key: "GITHUB_TOKEN",
      redactedValue:
        'GITHUB_TOKEN="REDACTED<$p0nBrp3QSPMt7DypsFgSRdYfrbA3546N2a370UpV15EMHoo5XFeABiFYMt5R2IkoTGDB/FOFlrr3jVo1H9CJ0evRJHPbBhC1hXaQPjWk1A==>"',
    },
    {
      key: "AWS_ACCESS_KEY_ID",
      redactedValue:
        'AWS_ACCESS_KEY_ID="REDACTED<$A9kjOiTR6L8YXNq8DXM/e7yv6omTWpglmBmIZOOrXNhPvmE9e6c6GOChWB1v6wRpboDO07Z45nuSMu4=>"',
    },
    {
      key: "AWS_SECRET_ACCESS_KEY",
      redactedValue:
        'AWS_SECRET_ACCESS_KEY="REDACTED<$ZC/eGkm6541ixJ48573XHvpBOumat4xhRyV8ROZwL3fgS2CHhi73g+kzYEkb/bkWS+tJajjICWm/1kXjQ6b0suL7PbcwnbJHKtkYcujWxw==>"',
    },
    {
      key: "GITHUB_TOKEN",
      redactedValue:
        'GITHUB_TOKEN="REDACTED<$iPKajC6vbjifexEIptk0LcH0bOdsPaGcTKT5S5QmjzmnWFWfT3Ptmfq8c61oHV8D23qQVcLYRL+dK3Py/5tCc1qU2tyz/cfCMxPnbdhbJQ==>"',
    },
    {
      key: "AWS_ACCESS_KEY_ID",
      redactedValue:
        'AWS_ACCESS_KEY_ID="REDACTED<$DH3fMpVAb+fHZKz9hu437l6rN9VF1BXciCpk+q5OGGYTuXVWY1uCj44q7FsRF9jkNSNi/1bfUmjjwJg=>"',
    },
    {
      key: "AWS_SECRET_ACCESS_KEY",
      redactedValue:
        'AWS_SECRET_ACCESS_KEY="REDACTED<$iZF8W1J0R3ErViM/MyR6djFFWwZel1RO/doE8cw2ghEzu745MvYloawzN/FzXPPD2gRllBMR1Zi8cvdqDutHEKyMN1xXPCBoqAkyH6h2Cw==>"',
    },
  ]);
});
