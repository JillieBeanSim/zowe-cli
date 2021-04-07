/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ITestEnvironment, runCliScript } from "../../../../../../../__tests__/__packages__/ts-cli-test-utils";
import { TestEnvironment } from "../../../../../../../__tests__/__src__/environment/TestEnvironment";
import { ITestPropertiesSchema } from "../../../../../../../__tests__/__src__/properties/ITestPropertiesSchema";

// Test Environment populated in the beforeAll();
let TEST_ENVIRONMENT: ITestEnvironment<ITestPropertiesSchema>;

describe("Unmount File System", () => {
    // Create the unique test environment
    beforeAll(async () => {
        TEST_ENVIRONMENT = await TestEnvironment.setUp({
            testName: "zos_unmount_file_system",
            skipProperties: true
        });
    });

    afterAll(async () => {
        await TestEnvironment.cleanUp(TEST_ENVIRONMENT);
    });
    it("should display unmount fs help", async () => {
        const response = runCliScript(__dirname + "/__scripts__/unmount_fs_help.sh",
            TEST_ENVIRONMENT);
        expect(response.status).toBe(0);
        expect(response.stderr.toString()).toBe("");
        expect(response.stdout.toString()).toMatchSnapshot();
    });

    it("should fail unmounting the fs due to missing file system name", async () => {
        const response = runCliScript(__dirname + "/__scripts__/command/command_unmount_fs.sh",
            TEST_ENVIRONMENT, [""]);
        expect(response.status).toBe(1);
        expect(response.stderr.toString()).toContain("fileSystemName");
        expect(response.stderr.toString()).toContain("Missing Positional");
    });

});
