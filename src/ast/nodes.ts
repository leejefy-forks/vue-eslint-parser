/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
import type { ScopeManager } from "eslint-scope"
import type { ParseError } from "./errors"
import type { HasLocation } from "./locations"
import type { Token } from "./tokens"
import type { ESLintNode, ESLintStatement, ESLintModuleDeclaration } from './eslint';
import type {
    VNode, VForExpression, VOnExpression, VSlotScopeExpression, VFilterSequenceExpression,
    VFilter, VElement, HasConcreteInfo
} from './vue';

export * from './eslint';
export * from './vue';

//------------------------------------------------------------------------------
// Common
//------------------------------------------------------------------------------

/**
 * Objects which have their parent.
 */
export interface HasParent {
    parent?: Node | null
}

/**
 * The union type for all nodes.
 */
export type Node =
    | ESLintNode
    | VNode
    | VForExpression
    | VOnExpression
    | VSlotScopeExpression
    | VFilterSequenceExpression
    | VFilter

//------------------------------------------------------------------------------
// Script
//------------------------------------------------------------------------------

/**
* The parsing result of ESLint custom parsers.
*/
export interface ESLintExtendedProgram {
    ast: ESLintProgram
    services?: {}
    visitorKeys?: { [type: string]: string[] }
    scopeManager?: ScopeManager
}

export interface ESLintProgram extends HasLocation, HasParent {
    type: "Program"
    sourceType: "script" | "module"
    body: (ESLintStatement | ESLintModuleDeclaration)[]
    templateBody?: VElement & HasConcreteInfo
    tokens?: Token[]
    comments?: Token[]
    errors?: ParseError[]
}

//------------------------------------------------------------------------------
// Template
//------------------------------------------------------------------------------

/**
 * Constants of namespaces.
 * @see https://infra.spec.whatwg.org/#namespaces
 */
export const NS = Object.freeze({
    HTML: "http://www.w3.org/1999/xhtml" as "http://www.w3.org/1999/xhtml",
    MathML: "http://www.w3.org/1998/Math/MathML" as "http://www.w3.org/1998/Math/MathML",
    SVG: "http://www.w3.org/2000/svg" as "http://www.w3.org/2000/svg",
    XLink: "http://www.w3.org/1999/xlink" as "http://www.w3.org/1999/xlink",
    XML: "http://www.w3.org/XML/1998/namespace" as "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/" as "http://www.w3.org/2000/xmlns/",
})

/**
 * Type of namespaces.
 */
export type Namespace =
    | typeof NS.HTML
    | typeof NS.MathML
    | typeof NS.SVG
    | typeof NS.XLink
    | typeof NS.XML
    | typeof NS.XMLNS