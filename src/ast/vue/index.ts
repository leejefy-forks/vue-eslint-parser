import type { HasParent, Namespace } from '../index';
import type { ParseError } from "../errors"
import type { HasLocation } from '../locations';
import type { Token } from "../tokens"
import type {
  ESLintStatement, ESLintIdentifier, ESLintPattern, ESLintExpression, ESLintSpreadElement
} from '../eslint';

/**
 * Type of variable definitions.
 */
export interface Variable {
  id: ESLintIdentifier
  kind: "v-for" | "scope"
  references: Reference[]
}

/**
* Type of variable references.
*/
export interface Reference {
  id: ESLintIdentifier
  mode: "rw" | "r" | "w"
  variable: Variable | null
}

/**
* The node of `v-for` directives.
*/
export interface VForExpression extends HasLocation, HasParent {
  type: "VForExpression"
  parent: VExpressionContainer
  left: ESLintPattern[]
  right: ESLintExpression
}

/**
* The node of `v-on` directives.
*/
export interface VOnExpression extends HasLocation, HasParent {
  type: "VOnExpression"
  parent: VExpressionContainer
  body: ESLintStatement[]
}

/**
* The node of `slot-scope` directives.
*/
export interface VSlotScopeExpression extends HasLocation, HasParent {
  type: "VSlotScopeExpression"
  parent: VExpressionContainer
  params: ESLintPattern[]
}

/**
* The node of a filter sequence which is separated by `|`.
*/
export interface VFilterSequenceExpression extends HasLocation, HasParent {
  type: "VFilterSequenceExpression"
  parent: VExpressionContainer
  expression: ESLintExpression
  filters: VFilter[]
}

/**
* The node of a filter sequence which is separated by `|`.
*/
export interface VFilter extends HasLocation, HasParent {
  type: "VFilter"
  parent: VFilterSequenceExpression
  callee: ESLintIdentifier
  arguments: (ESLintExpression | ESLintSpreadElement)[]
}

/**
* The union type of any nodes.
*/
export type VNode =
  | VAttribute
  | VDirective
  | VDirectiveKey
  | VDocumentFragment
  | VElement
  | VEndTag
  | VExpressionContainer
  | VIdentifier
  | VLiteral
  | VStartTag
  | VText

/**
* Text nodes.
*/
export interface VText extends HasLocation, HasParent {
  type: "VText"
  parent: VDocumentFragment | VElement
  value: string
}

/**
* The node of JavaScript expression in text.
* e.g. `{{ name }}`
*/
export interface VExpressionContainer extends HasLocation, HasParent {
  type: "VExpressionContainer"
  parent: VDocumentFragment | VElement | VDirective | VDirectiveKey
  expression:
  | ESLintExpression
  | VFilterSequenceExpression
  | VForExpression
  | VOnExpression
  | VSlotScopeExpression
  | null
  references: Reference[]
}

/**
* Attribute name nodes.
*/
export interface VIdentifier extends HasLocation, HasParent {
  type: "VIdentifier"
  parent: VAttribute | VDirectiveKey
  name: string
  rawName: string
}

/**
* Attribute name nodes.
*/
export interface VDirectiveKey extends HasLocation, HasParent {
  type: "VDirectiveKey"
  parent: VDirective
  name: VIdentifier
  argument: VExpressionContainer | VIdentifier | null
  modifiers: VIdentifier[]
}

/**
* Attribute value nodes.
*/
export interface VLiteral extends HasLocation, HasParent {
  type: "VLiteral"
  parent: VAttribute
  value: string
}

/**
* Static attribute nodes.
*/
export interface VAttribute extends HasLocation, HasParent {
  type: "VAttribute"
  parent: VStartTag
  directive: false
  key: VIdentifier
  value: VLiteral | null
}

/**
* Directive nodes.
*/
export interface VDirective extends HasLocation, HasParent {
  type: "VAttribute"
  parent: VStartTag
  directive: true
  key: VDirectiveKey
  value: VExpressionContainer | null
}

/**
* Start tag nodes.
*/
export interface VStartTag extends HasLocation, HasParent {
  type: "VStartTag"
  parent: VElement
  selfClosing: boolean
  attributes: (VAttribute | VDirective)[]
}

/**
* End tag nodes.
*/
export interface VEndTag extends HasLocation, HasParent {
  type: "VEndTag"
  parent: VElement
}

/**
* The property which has concrete information.
*/
export interface HasConcreteInfo {
  tokens: Token[]
  comments: Token[]
  errors: ParseError[]
}

/**
* Element nodes.
*/
export interface VElement extends HasLocation, HasParent {
  type: "VElement"
  parent: VDocumentFragment | VElement
  namespace: Namespace
  name: string
  rawName: string
  startTag: VStartTag
  children: (VElement | VText | VExpressionContainer)[]
  endTag: VEndTag | null
  variables: Variable[]
}

/**
* Root nodes.
*/
export interface VDocumentFragment
  extends HasLocation,
  HasParent,
  HasConcreteInfo {
  type: "VDocumentFragment"
  parent: null
  children: (VElement | VText | VExpressionContainer | VStyleElement)[]
}

/**
* Style element nodes.
*/
export interface VStyleElement extends VElement {
  type: "VElement"
  name: "style"
  style: true
  children: (VText | VExpressionContainer)[]
}