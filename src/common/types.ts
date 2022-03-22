import {
  AlertCommentSecOpsBulkCommentType,
  AlertCommentSecOpsBulkUpdateCommentType,
  AlertCommentSecOpsCommentType,
  AlertFiltersAlertExtraDataSearchType,
  AlertFiltersGroupBy,
  AlertFiltersOrderBy,
  EntityDirection,
  EntityFamily,
  EntitySuperTypes,
  EntityType,
} from './const';

export interface Entity {
  id?: string;
  hostname?: string;
  url?: string;
  ip?: string;
  mac?: string;
  name?: string;
  location?: EntityLocation;
  email?: string;
  windowsDomain?: string;
  account?: string;
  hash?: string;
  impact?: string;
  creationDate?: number;
  modificationDate?: number;
  json?: string;
  domain?: string;
  extraDataMaps?: { [key: string]: string };
  entityType?: EntityType;
  entitySuperTypes?: EntitySuperTypes[];
  entityFamily?: EntityFamily;
  direction?: EntityDirection;
  internalEntity?: boolean;
}

export interface CorrelationTrigger {}

export interface CorrelationTriggerEach extends CorrelationTrigger {
  externalPeriod?: number;
  externalOffset?: number;
  internalPeriod?: number;
  internalOffset?: number;
}

export interface User {
  id?: string;
  email?: string;
  username?: string;
  telephone?: string;
  pwd?: string;
  status?: number;
  validation_token?: string;
  defaultDomain?: string;
  updateDate?: Date;
  creationDate?: Date;
  otpSecret?: string;
  loginAttempts?: number;
  recoveryAttempts?: number;
}

export interface Category {
  id?: number;
  name?: string;
  owner?: string;
  subCategories?: SubCategory[];
}

export interface AlertFilters {
  alertId?: number;
  alertType?: string;
  keywords?: string;
  domainId?: string;
  locationCity?: string;
  locationCountry?: string;
  mitreTactics?: string;
  mitreTechnique?: string;
  priority?: string;
  from?: string;
  to?: string;
  offset?: string;
  limit?: string;
  status?: number;
  alertExtraDataSearch?: { [key: string]: string };
  alertExtraDataSearchType?: AlertFiltersAlertExtraDataSearchType;
  entityPredicate?: { [key: string]: any };
  showAll?: boolean;
  minImpact?: number;
  maxImpact?: number;
  alertSuppression?: AlertSuppressionFilters;
  orderBy?: AlertFiltersOrderBy;
  groupBy?: AlertFiltersGroupBy;
  assignedUser?: string;
  limitAsInt?: number;
  toAsLong?: number;
  fromAsLong?: number;
  offsetAsInt?: number;
}

export interface AlertComments {
  idAlert?: number;
  comments?: Comment[];
}

export interface CorrelationTriggerSeveral extends CorrelationTrigger {
  period?: number;
  threshold?: number;
  keys?: string[];
}

export interface CortexRequest {
  query?: string;
  startTime?: number;
  endTime?: number;
  maxWaitTime?: number;
}

export interface AlertSuppressionFilters {
  alertTypes?: string[];
  keywords?: string[];
  domainIds?: string[];
  locationCities?: string[];
  locationCountries?: string[];
  mitreTactics?: string[];
  mitreTechniques?: string[];
  priorities?: string[];
  alertNames?: string[];
  fromTo?: AlertSuppressionFiltersFromTo[];
  statuses?: number[];
  entityPredicates?: { [key: string]: any }[];
  minImpact?: number;
  maxImpact?: number;
}

export interface AlertTagsRequest {
  alertIds?: string[];
  tags?: string[];
}

export interface Pageable {
  pageSize?: number;
  pageNumber?: number;
  sort?: Sort;
  offset?: number;
}

export interface EventOutput {
  type?: Type;
  closed?: boolean;
}

export interface FunnelStatisticsValues {
  total?: number;
  enriched?: number;
}

export interface UserDomain {
  id?: number;
  user?: User;
  domain?: Domain;
  lastTimeLogged?: Date;
  status?: number;
  creationDate?: Date;
  updateDate?: Date;
  pwd?: string;
  validationToken?: string;
  roleCustom?: number;
  rolesCustom?: number[];
  externalId?: string;
  owner?: boolean;
  alertsLastVisited?: Date;
}

export interface Sort {}

export interface FunnelStatistics {
  total?: FunnelStatisticsValues;
  types?: { [key: string]: FunnelStatisticsValues };
}

export interface AlertCommentSecOps {
  elementId?: string;
  commentType?: AlertCommentSecOpsCommentType;
  commentMsg?: string;
  commentTitle?: string;
  validContent?: boolean;
}

export interface Context {
  id?: number;
  pilotContextId?: string;
  name?: string;
  category?: Category;
  subCategory?: SubCategory;
  application_id?: number;
  defaultParams?: string;
  includefields?: string;
  excludefields?: string;
}

export interface CorrelationTriggerRolling extends CorrelationTrigger {
  period?: number;
  backPeriod?: number;
}

export interface Comment {
  id?: number;
  author?: UserDomain;
  msg?: string;
  ack?: string;
  creationDate?: Date;
  updateDate?: Date;
  elementType?: string;
  elementId?: string;
  domain?: Domain;
  title?: string;
  status?: string;
  task?: boolean;
}

export interface CorrelationTriggerLow extends CorrelationTrigger {
  period?: number;
  threshold?: number;
}

export interface AlertSuppressionFiltersFromTo {
  from?: string;
  to?: string;
  toAsLong?: number;
  fromAsLong?: number;
}

export interface Reseller {
  id?: number;
  name?: string;
  preferences?: string;
  contactInformation?: string;
  pricePlans?: string;
  updateDate?: Date;
  creationDate?: Date;
  permPolicy?: string;
  menuView?: string;
  limits?: string;
  groupId?: number;
  webPreferences?: string;
}

export interface AlertCommentSecOpsBulkUpdate {
  idMap?: { [key: string]: number[] };
  commentMsg?: string;
  commentTitle?: string;
  commentType?: AlertCommentSecOpsBulkUpdateCommentType;
}

export interface AlertsEntityFilteredRequest {
  limit?: string;
  offset?: string;
  from?: string;
  to?: string;
  operator?: string;
  entities?: string[];
  context?: string;
  showAll?: boolean;
  onlySecOpsAlerts?: boolean;
}

export interface EntityLocation {
  locationCountry?: string;
  locationCity?: string;
  locationState?: string;
  locationLat?: number;
  locationLon?: number;
}

export interface SubCategory {
  id?: number;
  name?: string;
  hasContext?: boolean;
  alert_category_id?: number;
  contextList?: Context[];
}

export interface Alert {
  id?: number;
  domain?: string;
  priority?: number;
  context?: string;
  category?: string;
  srcPort?: number;
  srcIp?: string;
  srcHost?: string;
  dstIp?: string;
  dstPort?: number;
  dstHost?: string;
  protocol?: string;
  username?: string;
  application?: string;
  engine?: string;
  extraData?: string;
  alertDate?: Date;
  status?: number;
  ack_status_date?: Date;
  createDate?: Date;
  updateDate?: Date;
  scaled?: boolean;
  digest?: string;
  uniquedigest?: string;
  contexto?: Context;
  postAlertAction?: string;
  contextLabel?: string;
  contextSubscription?: number;
  shouldSend?: boolean;
  alertOwner?: string;
  fullExtraData?: string;
  alertLabel?: string;
}

export interface AlertsEntityFilteredResponse {
  alerts?: AlertExtended[];
  alertsCount?: number;
}

export interface Domain {
  id?: string;
  name?: string;
  status?: number;
  type?: number;
  updateDate?: Date;
  creationDate?: Date;
  subscribed?: number;
  daysLeft?: number;
  showLanding?: boolean;
  reseller?: Reseller;
  groupId?: number;
  alertsLastReseted?: Date;
}

export interface CorrelationTriggerGradient extends CorrelationTrigger {
  threshold?: number;
  absolute?: boolean;
  aggregationColumn?: string[];
}

export interface AlertCommentSecOpsBulk {
  elementIds?: string[];
  commentMsg?: string;
  commentTitle?: string;
  commentType?: AlertCommentSecOpsBulkCommentType;
}

export interface CorrelationTriggerDeviation extends CorrelationTrigger {
  threshold?: number;
  absolute?: boolean;
  aggregationColumn?: string[];
}

export interface Type {
  typeName?: string;
}

// Tipos usados
export type Status = 0 | 1 | 2 | 100 | 300 | 500 | 600 | 700;

export interface AlertFilter {
  limit: string;
  offset: string;
  from: string;
  to: string;
  orderby?: string;
  orderasc?: boolean;
  showAll?: boolean;
}

export interface AlertExtended {
  id?: number;
  domain?: string;
  priority?: number;
  context?: string;
  category?: string;
  srcPort?: number;
  srcIp?: string;
  srcHost?: string;
  dstIp?: string;
  dstPort?: number;
  dstHost?: string;
  protocol?: string;
  username?: string;
  application?: string;
  engine?: string;
  extraData?: string;
  alertDate?: Date;
  status?: number;
  ack_status_date?: Date;
  createDate?: Date;
  updateDate?: Date;
  scaled?: boolean;
  digest?: string;
  uniquedigest?: string;
  contexto?: Context;
  postAlertAction?: string;
  contextLabel?: string;
  contextSubscription?: number;
  shouldSend?: boolean;
  alertOwner?: string;
  fullExtraData?: string;
  alertType?: string;
  alertMitreTactics?: string;
  alertMitreTechniques?: string;
  alertPriority?: string;
  alertDefinition?: AlertDefinitionObject;
  allExtraDataFields?: { [key: string]: string };
  tags?: string[];
  entities?: Entity[];
  commentsList?: Comment[];
  alertLabel?: string;
}

export interface AlertDefinitionFilter {
  nameFilter?: string;
  idFilter?: number;
  page?: number;
  size?: number;
}

export interface AlertDefinitionObject {
  id?: string;
  creationDate?: Date;
  name?: string;
  message?: string;
  description?: string;
  categoryId?: string;
  subcategory?: string;
  subcategoryId?: string;
  isActive?: boolean;
  isFavorite?: boolean;
  isAlertChain?: boolean;
  alertCorrelationContext?: AlertCorrelationContext;
  actionPolicyId?: string[];
}

export interface AlertCorrelationContext {
  id?: string;
  nameId?: string;
  ownerEmail?: string;
  querySourceCode?: string;
  priority?: number;
  correlationTrigger?: CorrelationTrigger;
}

export interface OptionRequestObject {
  body: string | null;
  method: string;
  headers: { [name: string]: any };
}
