import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";
 import { employees, Employee } from "../../../data/employees";