/**
 * Copyright (c) AsurRaa, Inc. and its affiliates. All rights reserved.
 *
 * This file provided by AsurRaa is for non-commercial testing and evaluation
 * purposes only. AsurRaa reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * AsurRaa BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { CountryPhoneInput } from "./phone-input/phone-input";
export default CountryPhoneInput;
export * from "./phone-input/phone-input";
export * from "./phone-input/area-select";

export type { CountryPhoneInputValue } from "./phone-input/typings";
export * from "./phone-input/config";
export * from "./phone-input/sources";

// * main
export { SuraMultiCountryPhoneInput } from "./sura-multiple-country-phone-input";
export type { SuraMultiCountryPhoneInputProps } from "./sura-multiple-country-phone-input";
export { SuraMultiCountryPhoneInputProvider } from "./sura-multiple-country-phone-input-provider";
export { getPhraseReturn } from "./sura-multiple-country-phone-input";
